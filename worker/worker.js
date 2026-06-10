// Cloudflare Worker - CORONG 后端API
// 部署地址：corong-api.你的用户名.workers.dev

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export default {
  async fetch(request, env) {
    // 处理预检请求
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS })
    }

    const url = new URL(request.url)
    const path = url.pathname

    try {
      // ===== 路由分发 =====
      if (path === '/api/analyze-skin' && request.method === 'POST') {
        return await handleSkinAnalysis(request, env)
      }

      if (path === '/api/ugc/upload' && request.method === 'POST') {
        return await handleUGCUpload(request, env)
      }

      if (path === '/api/ugc/list' && request.method === 'GET') {
        return await handleUGCList(request, env)
      }

      if (path === '/api/points/add' && request.method === 'POST') {
        return await handleAddPoints(request, env)
      }

      if (path === '/api/points/get' && request.method === 'GET') {
        return await handleGetPoints(request, env)
      }

      if (path === '/api/health') {
        return jsonResponse({ status: 'ok', version: '1.0.0' })
      }

      return jsonResponse({ error: 'Not found' }, 404)

    } catch (e) {
      return jsonResponse({ error: e.message }, 500)
    }
  }
}

// ===== AI肤色分析 =====
async function handleSkinAnalysis(request, env) {
  const { imageBase64 } = await request.json()

  if (!imageBase64) {
    return jsonResponse({ error: 'Missing imageBase64' }, 400)
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [{
        role: 'user',
        content: [
          {
            type: 'image',
            source: { type: 'base64', media_type: 'image/jpeg', data: imageBase64 }
          },
          {
            type: 'text',
            text: `你是CORONG蔻容的AI肤色分析师，专注东南亚肤色。分析这张照片中人物的肤色，用JSON格式返回（只返回JSON，不要其他文字）：
{
  "toneName": "肤色名称（从：象牙白/自然米/小麦色/蜂蜜棕/深棕色/深邃棕 中选一个）",
  "hexColor": "最接近的肤色十六进制颜色值",
  "toneDesc": "一句话描述这个肤色的特点",
  "undertones": ["底调1", "底调2"],
  "shades": [
    {"code": "N10", "name": "色号名称", "color": "#十六进制", "shopeeUrl": "https://shopee.co.th"},
    {"code": "N20", "name": "色号名称", "color": "#十六进制", "shopeeUrl": "https://shopee.co.th"},
    {"code": "N30", "name": "色号名称", "color": "#十六进制", "shopeeUrl": "https://shopee.co.th"}
  ],
  "tips": ["妆容建议1", "妆容建议2", "妆容建议3"]
}`
          }
        ]
      }]
    })
  })

  const data = await response.json()

  if (!response.ok) {
    return jsonResponse({ error: 'Claude API error', detail: data }, 500)
  }

  try {
    const text = data.content[0].text
    const result = JSON.parse(text)
    return jsonResponse({ success: true, result })
  } catch (e) {
    return jsonResponse({ error: 'Failed to parse AI response' }, 500)
  }
}

// ===== UGC图片上传到R2 =====
async function handleUGCUpload(request, env) {
  const formData = await request.formData()
  const file = formData.get('image')
  const caption = formData.get('caption') || ''
  const tags = formData.get('tags') || '[]'
  const userId = formData.get('userId') || 'anonymous'

  if (!file) {
    return jsonResponse({ error: 'Missing image' }, 400)
  }

  const ext = file.name.split('.').pop() || 'jpg'
  const key = `ugc/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  // 上传到R2
  await env.CORONG_BUCKET.put(key, file.stream(), {
    httpMetadata: { contentType: file.type }
  })

  const imageUrl = `https://assets.corong.beauty/${key}`

  // 存到D1数据库
  const id = Date.now().toString()
  await env.CORONG_DB.prepare(
    `INSERT INTO ugc_posts (id, user_id, image_url, caption, tags, likes, created_at)
     VALUES (?, ?, ?, ?, ?, 0, datetime('now'))`
  ).bind(id, userId, imageUrl, caption, tags).run()

  // 给用户加积分
  await addUserPoints(env, userId, 50)

  return jsonResponse({ success: true, id, imageUrl, pointsEarned: 50 })
}

// ===== 获取UGC列表 =====
async function handleUGCList(request, env) {
  const url = new URL(request.url)
  const limit = parseInt(url.searchParams.get('limit') || '20')
  const offset = parseInt(url.searchParams.get('offset') || '0')
  const tag = url.searchParams.get('tag') || ''

  let query = `SELECT * FROM ugc_posts ORDER BY created_at DESC LIMIT ? OFFSET ?`
  let params = [limit, offset]

  if (tag && tag !== '全部') {
    query = `SELECT * FROM ugc_posts WHERE tags LIKE ? ORDER BY created_at DESC LIMIT ? OFFSET ?`
    params = [`%${tag}%`, limit, offset]
  }

  const { results } = await env.CORONG_DB.prepare(query).bind(...params).all()

  return jsonResponse({ success: true, posts: results })
}

// ===== 添加积分 =====
async function handleAddPoints(request, env) {
  const { userId, points, reason } = await request.json()

  if (!userId || !points) {
    return jsonResponse({ error: 'Missing userId or points' }, 400)
  }

  const total = await addUserPoints(env, userId, points)
  return jsonResponse({ success: true, pointsAdded: points, totalPoints: total })
}

// ===== 获取积分 =====
async function handleGetPoints(request, env) {
  const url = new URL(request.url)
  const userId = url.searchParams.get('userId')

  if (!userId) {
    return jsonResponse({ error: 'Missing userId' }, 400)
  }

  const result = await env.CORONG_DB.prepare(
    `SELECT total_points FROM user_points WHERE user_id = ?`
  ).bind(userId).first()

  return jsonResponse({ success: true, points: result?.total_points || 0 })
}

// ===== 工具函数 =====
async function addUserPoints(env, userId, points) {
  await env.CORONG_DB.prepare(`
    INSERT INTO user_points (user_id, total_points) VALUES (?, ?)
    ON CONFLICT(user_id) DO UPDATE SET total_points = total_points + ?
  `).bind(userId, points, points).run()

  const result = await env.CORONG_DB.prepare(
    `SELECT total_points FROM user_points WHERE user_id = ?`
  ).bind(userId).first()

  return result?.total_points || points
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
  })
}
