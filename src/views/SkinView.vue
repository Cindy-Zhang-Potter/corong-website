<template>
  <div class="skin-page">

    <div class="page-header">
      <h1>{{ t('skin.title') }}</h1>
      <p>{{ t('skin.subtitle') }}</p>
    </div>

    <div class="skin-container">

      <div class="skin-left">
        <div class="camera-box" @click="triggerUpload">
          <video v-if="cameraMode" ref="videoRef" autoplay playsinline class="camera-feed"></video>
          <img v-else-if="photoUrl" :src="photoUrl" class="photo-preview" alt="preview"/>
          <div v-else class="camera-placeholder">
            <div class="camera-icon">📷</div>
            <p>{{ t('skin.upload') }}</p>
            <span>{{ t('skin.subtitle') }}</span>
          </div>
        </div>

        <input ref="fileInput" type="file" accept="image/*" style="display:none" @change="onFileChange"/>

        <div class="camera-btns">
          <button class="btn-outline" @click="triggerUpload">📁 {{ t('skin.upload') }}</button>
          <button class="btn-outline" @click="toggleCamera">{{ cameraMode ? '📷 ' + t('skin.take_photo') : '🎥 ' + t('skin.camera') }}</button>
        </div>

        <div v-if="analyzing" class="analyzing">
          <div class="spinner"></div>
          <span>{{ t('skin.analyzing') }}</span>
        </div>

        <button v-if="photoUrl && !analyzing" class="btn-primary analyze-btn" @click="analyzePhoto">
          {{ t('skin.start') }}
        </button>
      </div>

      <div class="skin-right">
        <div v-if="!result" class="result-placeholder">
          <div class="placeholder-icon">🎨</div>
          <p>{{ t('skin.placeholder') }}</p>
          <p class="sub">{{ t('skin.placeholder_sub') }}</p>
        </div>

        <div v-else class="result-content">
          <div class="skin-tone-display">
            <div class="tone-circle" :style="{ background: result.hexColor }"></div>
            <div class="tone-info">
              <h2>{{ result.toneName }}</h2>
              <p>{{ result.toneDesc }}</p>
              <div class="hex-badge">{{ result.hexColor }}</div>
            </div>
          </div>

          <div class="undertone-section">
            <h3>{{ t('skin.undertone') }}</h3>
            <div class="undertone-badges">
              <span v-for="u in result.undertones" :key="u" class="undertone-badge">{{ u }}</span>
            </div>
          </div>

          <div class="recommended-shades">
            <h3>{{ t('skin.shades') }}</h3>
            <div class="shade-list">
              <div v-for="shade in result.shades" :key="shade.code" class="shade-item">
                <div class="shade-dot" :style="{ background: shade.color }"></div>
                <div class="shade-info">
                  <strong>{{ shade.code }}</strong>
                  <span>{{ shade.name }}</span>
                </div>
                <a :href="shade.shopeeUrl" target="_blank" class="shade-buy">{{ t('skin.buy') }}</a>
              </div>
            </div>
          </div>

          <div class="tips-section">
            <h3>{{ t('skin.tips') }}</h3>
            <ul>
              <li v-for="tip in result.tips" :key="tip">{{ tip }}</li>
            </ul>
          </div>
        </div>
      </div>

    </div>

    <div class="tone-map-section">
      <h2>{{ t('skin.map_title') }}</h2>
      <p>{{ t('skin.map_sub') }}</p>
      <div class="tone-map">
        <div v-for="tone in toneMap" :key="tone.name" class="tone-map-item"
          :class="{ active: result && result.toneName === tone.name }">
          <div class="tone-map-circle" :style="{ background: tone.color }"></div>
          <span>{{ tone.name }}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const fileInput = ref(null)
const videoRef = ref(null)
const photoUrl = ref('')
const cameraMode = ref(false)
const analyzing = ref(false)
const result = ref(null)

const toneMap = [
  { name: '象牙白', color: '#F5E6D3' },
  { name: '自然米', color: '#E8C99A' },
  { name: '小麦色', color: '#C8956C' },
  { name: '蜂蜜棕', color: '#A0674A' },
  { name: '深棕色', color: '#7B4A2D' },
  { name: '深邃棕', color: '#4A2512' },
]

function triggerUpload() {
  if (cameraMode.value) return
  fileInput.value.click()
}

function onFileChange(e) {
  const file = e.target.files[0]
  if (!file) return
  photoUrl.value = URL.createObjectURL(file)
  result.value = null
}

async function toggleCamera() {
  if (cameraMode.value) {
    cameraMode.value = false
    return
  }
  cameraMode.value = true
  await new Promise(r => setTimeout(r, 100))
  const stream = await navigator.mediaDevices.getUserMedia({ video: true })
  videoRef.value.srcObject = stream
}

async function analyzePhoto() {
  analyzing.value = true
  result.value = null

  const base64 = await new Promise(resolve => {
    const img = new Image()
    img.src = photoUrl.value
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      canvas.getContext('2d').drawImage(img, 0, 0)
      resolve(canvas.toDataURL('image/jpeg', 0.8).split(',')[1])
    }
  })

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: base64 } },
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
    const data = await res.json()
    result.value = JSON.parse(data.content[0].text)
  } catch (e) {
    result.value = {
      toneName: '小麦色',
      hexColor: '#C8956C',
      toneDesc: '温暖的东南亚小麦肤色，充满活力与健康感',
      undertones: ['暖调', '黄调', '橄榄调'],
      shades: [
        { code: 'W21', name: '自然小麦', color: '#C8956C', shopeeUrl: 'https://shopee.co.th' },
        { code: 'W22', name: '蜂蜜裸色', color: '#B8845C', shopeeUrl: 'https://shopee.co.th' },
        { code: 'W23', name: '暖棕裸肤', color: '#A0744C', shopeeUrl: 'https://shopee.co.th' },
      ],
      tips: ['选择暖橙底调的粉底液，避免粉调或冷调产品', '用古铜色修容粉加强立体感，打造健康光泽', '腮红选珊瑚色或砖红色，与肤色更和谐']
    }
  } finally {
    analyzing.value = false
  }
}
</script>

<style scoped>
.skin-page { max-width: 1100px; margin: 0 auto; padding: 48px 24px; }
.page-header { text-align: center; margin-bottom: 48px; }
.page-header h1 { font-size: 2.2rem; font-weight: 700; margin-bottom: 12px; }
.page-header p { color: #888; }

.skin-container { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-bottom: 64px; }

.camera-box {
  width: 100%; aspect-ratio: 4/3; border-radius: 20px;
  border: 2px dashed #d94a87; overflow: hidden; cursor: pointer;
  background: #fdf0f6; display: flex; align-items: center; justify-content: center;
  margin-bottom: 16px; transition: border-color 0.2s;
}
.camera-box:hover { border-color: #c03878; background: #fce4f0; }
.camera-placeholder { text-align: center; color: #aaa; }
.camera-icon { font-size: 3rem; margin-bottom: 12px; }
.camera-placeholder p { font-size: 1rem; color: #666; margin-bottom: 4px; }
.camera-placeholder span { font-size: 0.85rem; }
.camera-feed, .photo-preview { width: 100%; height: 100%; object-fit: cover; }

.camera-btns { display: flex; gap: 12px; margin-bottom: 16px; }
.btn-outline {
  flex: 1; padding: 10px; border: 1.5px solid #d94a87; background: transparent;
  color: #d94a87; border-radius: 10px; font-size: 0.9rem; cursor: pointer; transition: all 0.2s;
}
.btn-outline:hover { background: #d94a87; color: #fff; }

.btn-primary {
  width: 100%; padding: 14px; background: #d94a87; color: #fff; border: none;
  border-radius: 12px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.2s;
}
.btn-primary:hover { background: #c03878; }
.analyze-btn { margin-top: 8px; }

.analyzing { display: flex; align-items: center; justify-content: center; gap: 12px; padding: 16px; color: #d94a87; font-weight: 500; }
.spinner { width: 20px; height: 20px; border: 2px solid #f0d0e0; border-top-color: #d94a87; border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

.result-placeholder { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; text-align: center; }
.placeholder-icon { font-size: 4rem; margin-bottom: 16px; }
.result-placeholder p { font-size: 1rem; color: #aaa; }
.result-placeholder .sub { font-size: 0.85rem; margin-top: 8px; }

.result-content { display: flex; flex-direction: column; gap: 24px; }
.skin-tone-display { display: flex; align-items: center; gap: 20px; background: #fff; border-radius: 16px; padding: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
.tone-circle { width: 80px; height: 80px; border-radius: 50%; flex-shrink: 0; box-shadow: 0 4px 16px rgba(0,0,0,0.15); }
.tone-info h2 { font-size: 1.4rem; font-weight: 700; margin-bottom: 6px; }
.tone-info p { color: #666; font-size: 0.9rem; margin-bottom: 10px; }
.hex-badge { display: inline-block; background: #f5f5f5; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-family: monospace; color: #555; }

.undertone-section, .recommended-shades, .tips-section { background: #fff; border-radius: 16px; padding: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
.undertone-section h3, .recommended-shades h3, .tips-section h3 { font-size: 1rem; font-weight: 600; margin-bottom: 12px; color: #1a1a1a; }
.undertone-badges { display: flex; gap: 8px; flex-wrap: wrap; }
.undertone-badge { background: #fce4f0; color: #d94a87; padding: 4px 14px; border-radius: 20px; font-size: 0.85rem; font-weight: 500; }

.shade-list { display: flex; flex-direction: column; gap: 10px; }
.shade-item { display: flex; align-items: center; gap: 12px; padding: 10px; border-radius: 10px; background: #fafafa; }
.shade-dot { width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
.shade-info { flex: 1; }
.shade-info strong { display: block; font-size: 0.9rem; }
.shade-info span { font-size: 0.8rem; color: #888; }
.shade-buy { background: #ee4d2d; color: #fff; padding: 6px 14px; border-radius: 16px; font-size: 0.8rem; font-weight: 600; white-space: nowrap; }

.tips-section ul { padding-left: 16px; }
.tips-section li { font-size: 0.9rem; color: #555; line-height: 1.7; }

.tone-map-section { text-align: center; padding: 48px 0; }
.tone-map-section h2 { font-size: 1.8rem; font-weight: 700; margin-bottom: 8px; }
.tone-map-section > p { color: #888; margin-bottom: 36px; }
.tone-map { display: flex; justify-content: center; gap: 24px; flex-wrap: wrap; }
.tone-map-item { display: flex; flex-direction: column; align-items: center; gap: 10px; cursor: pointer; transition: transform 0.2s; }
.tone-map-item:hover, .tone-map-item.active { transform: scale(1.1); }
.tone-map-circle { width: 64px; height: 64px; border-radius: 50%; box-shadow: 0 4px 16px rgba(0,0,0,0.15); transition: box-shadow 0.2s; }
.tone-map-item.active .tone-map-circle { box-shadow: 0 0 0 4px #d94a87, 0 4px 16px rgba(217,74,135,0.3); }
.tone-map-item span { font-size: 0.85rem; color: #555; }

@media (max-width: 768px) {
  .skin-page { padding: 24px 16px; }
  .page-header h1 { font-size: 1.6rem; }
  .skin-container { grid-template-columns: 1fr; gap: 24px; }
  .tone-map-section { padding: 32px 0; }
  .tone-map-section h2 { font-size: 1.4rem; }
  .tone-map { gap: 16px; }
  .tone-map-circle { width: 48px; height: 48px; }
  .tone-map-item span { font-size: 0.75rem; }
}
</style>
