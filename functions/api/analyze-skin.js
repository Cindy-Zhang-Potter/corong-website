export async function onRequestPost(context) {
  try {
    const { imageBase64 } = await context.request.json()

    if (!imageBase64) {
      return new Response(JSON.stringify({ error: 'Missing imageBase64' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const apiToken = context.env.XIAOMI_API_TOKEN
    if (!apiToken) {
      return new Response(JSON.stringify({ error: 'API token not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const response = await fetch('https://token-plan-cn.xiaomimimo.com/anthropic/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiToken,
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
              text: `你是KOURONG蔻蓉的AI肤色分析师，专注东南亚肤色。分析这张照片中人物的肤色，用JSON格式返回（只返回JSON，不要其他文字）：
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
      return new Response(JSON.stringify({ error: 'Claude API error', detail: data }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const text = data.content[0].text
    const result = JSON.parse(text)

    return new Response(JSON.stringify({ success: true, result }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
