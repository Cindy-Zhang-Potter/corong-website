<template>
  <div class="ar-page">

    <div class="page-header">
      <h1>{{ t('ar.title') }}</h1>
      <p>{{ t('ar.subtitle') }}</p>
    </div>

    <div class="color-picker">
      <div v-for="color in lipColors" :key="color.code"
        class="color-item"
        :class="{ active: selectedColor.code === color.code }"
        @click="selectedColor = color">
        <div class="color-dot" :style="{ background: color.hex }"></div>
        <span>{{ color.name }}</span>
      </div>
    </div>

    <div class="ar-container">
      <div class="camera-wrap" ref="wrapRef">
        <video ref="videoRef" autoplay playsinline muted class="ar-video"></video>
        <canvas ref="canvasRef" class="ar-canvas"></canvas>
        <div v-if="!started" class="camera-overlay">
          <div class="overlay-content">
            <div class="overlay-icon">💄</div>
            <p>{{ t('ar.title') }}</p>
            <button class="start-btn" @click="startAR">{{ t('ar.start') }}</button>
          </div>
        </div>
        <div v-if="loading" class="camera-overlay">
          <div class="overlay-content">
            <div class="spinner"></div>
            <p>{{ loadingText }}</p>
          </div>
        </div>
        <div v-if="started && !loading" class="ar-badge">
          <span :style="{ background: selectedColor.hex }"></span>
          {{ selectedColor.name }} · {{ t('ar.live') }}
        </div>
      </div>

      <div class="ar-controls">
        <div class="control-section">
          <h3>{{ t('ar.current_shade') }}</h3>
          <div class="current-color">
            <div class="current-dot" :style="{ background: selectedColor.hex }"></div>
            <div>
              <strong>{{ selectedColor.code }}</strong>
              <p>{{ selectedColor.name }}</p>
            </div>
          </div>
        </div>

        <div class="control-section">
          <h3>{{ t('ar.opacity') }}</h3>
          <input type="range" v-model="opacity" min="20" max="80" class="slider"/>
          <div class="slider-labels">
            <span>{{ t('ar.natural') }}</span><span>{{ t('ar.rich') }}</span>
          </div>
        </div>

        <div class="control-section">
          <h3>{{ t('ar.finish') }}</h3>
          <div class="finish-btns">
            <button v-for="f in finishTypes" :key="f"
              :class="['finish-btn', { active: selectedFinish === f }]"
              @click="selectedFinish = f">{{ f }}</button>
          </div>
        </div>

        <a href="https://shopee.co.th" target="_blank" class="buy-now-btn">
          🛒 {{ t('common.buy') }} {{ selectedColor.code }}
        </a>

        <button v-if="started" class="screenshot-btn" @click="takeScreenshot">
          {{ t('ar.screenshot') }}
        </button>
      </div>
    </div>

    <div class="all-colors">
      <h2>{{ t('ar.all_shades') }}</h2>
      <div class="colors-grid">
        <div v-for="color in lipColors" :key="color.code"
          class="color-card"
          :class="{ active: selectedColor.code === color.code }"
          @click="selectedColor = color">
          <div class="color-swatch" :style="{ background: color.hex }"></div>
          <strong>{{ color.code }}</strong>
          <span>{{ color.name }}</span>
          <p>{{ color.desc }}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import * as faceapi from '@vladmandic/face-api'

const { t } = useI18n()

const videoRef = ref(null)
const canvasRef = ref(null)
const wrapRef = ref(null)
const started = ref(false)
const loading = ref(false)
const loadingText = ref('')
const opacity = ref(45)
const selectedFinish = ref('哑光')
const finishTypes = ['哑光', '水光', '镜面']

const lipColors = [
  { code: 'R01', name: '玫瑰裸粉', hex: '#C4687A', desc: '日常通勤首选，百搭裸粉调' },
  { code: 'R02', name: '泰式珊瑚', hex: '#E8735A', desc: '东南亚热带风情，活力珊瑚橙' },
  { code: 'R03', name: '复古砖红', hex: '#A0392B', desc: '秋冬经典色，复古知性风' },
  { code: 'R04', name: '正红烈焰', hex: '#CC2200', desc: '自信女性的标志色，永不过时' },
  { code: 'R05', name: '莓果紫调', hex: '#8B3A62', desc: '神秘浪漫，小众高级感' },
  { code: 'R06', name: '奶茶豆沙', hex: '#B57A6A', desc: '温柔系必备，奶油肌专属' },
]

const selectedColor = ref(lipColors[0])
let animationId = null
let stream = null
let isRunning = false

async function startAR() {
  loading.value = true
  loadingText.value = t('ar.loading_model')

  try {
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models')
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models')

    loadingText.value = t('ar.loading_camera')
    stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480, facingMode: 'user' } })
    videoRef.value.srcObject = stream

    await new Promise(r => { videoRef.value.onloadedmetadata = r })
    await videoRef.value.play()

    // 等视频真正有尺寸
    await new Promise(r => setTimeout(r, 300))

    const vw = videoRef.value.videoWidth || 640
    const vh = videoRef.value.videoHeight || 480
    canvasRef.value.width = vw
    canvasRef.value.height = vh

    started.value = true
    loading.value = false
    isRunning = true
    detectLoop()
  } catch (e) {
    loading.value = false
    alert('无法开启摄像头：' + e.message)
  }
}

async function detectLoop() {
  if (!isRunning || !videoRef.value || !canvasRef.value) return
  if (videoRef.value.readyState < 2) {
    animationId = requestAnimationFrame(detectLoop)
    return
  }

  const ctx = canvasRef.value.getContext('2d')
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)

  try {
    const detection = await faceapi
      .detectSingleFace(videoRef.value, new faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.3 }))
      .withFaceLandmarks()

    if (detection) {
      drawLipstick(ctx, detection.landmarks)
    }
  } catch (e) {}

  animationId = requestAnimationFrame(detectLoop)
}

function drawLipstick(ctx, landmarks) {
  const mouth = landmarks.getMouth()
  const W = canvasRef.value.width

  // 视频是镜像的(CSS scaleX(-1))，坐标需要翻转
  const pts = mouth.map(p => ({ x: W - p.x, y: p.y }))

  // 上嘴唇：pts 0-6，下嘴唇：pts 6-11 + pts[0]
  const upperOuter = pts.slice(0, 7)
  const lowerOuter = [pts[6], pts[7], pts[8], pts[9], pts[10], pts[11], pts[0]]
  const upperInner = [pts[12], pts[13], pts[14], pts[15], pts[16], pts[17], pts[12]]
  const lowerInner = [pts[12], pts[17], pts[16], pts[15], pts[14], pts[13], pts[12]]

  const alpha = Math.round((opacity.value / 100) * 255).toString(16).padStart(2, '0')
  const hex = selectedColor.value.hex

  ctx.save()

  if (selectedFinish.value === '镜面') {
    const grad = ctx.createLinearGradient(pts[3].x, pts[3].y, pts[9].x, pts[9].y)
    grad.addColorStop(0, hex + 'cc')
    grad.addColorStop(0.4, '#ffffffaa')
    grad.addColorStop(1, hex + 'cc')
    ctx.fillStyle = grad
  } else {
    ctx.fillStyle = hex + alpha
  }

  // 画外唇轮廓
  ctx.beginPath()
  ctx.moveTo(upperOuter[0].x, upperOuter[0].y)
  upperOuter.forEach(p => ctx.lineTo(p.x, p.y))
  lowerOuter.forEach(p => ctx.lineTo(p.x, p.y))
  ctx.closePath()
  ctx.fill()

  // 挖去内部空白（嘴巴内部）
  if (mouth.length >= 20) {
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    const inner = [pts[12], pts[13], pts[14], pts[15], pts[16], pts[17]]
    ctx.moveTo(inner[0].x, inner[0].y)
    inner.forEach(p => ctx.lineTo(p.x, p.y))
    ctx.closePath()
    ctx.fillStyle = 'rgba(0,0,0,0.6)'
    ctx.fill()
    ctx.globalCompositeOperation = 'source-over'
  }

  // 水光高光
  if (selectedFinish.value === '水光') {
    const cx = (pts[2].x + pts[4].x) / 2
    const cy = pts[3].y - 3
    ctx.beginPath()
    ctx.ellipse(cx, cy, 8, 4, 0, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(255,255,255,0.5)'
    ctx.fill()
  }

  ctx.restore()
}

function takeScreenshot() {
  const merged = document.createElement('canvas')
  merged.width = canvasRef.value.width
  merged.height = canvasRef.value.height
  const ctx = merged.getContext('2d')
  // 截图时需要反转回来
  ctx.translate(merged.width, 0)
  ctx.scale(-1, 1)
  ctx.drawImage(videoRef.value, 0, 0)
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.drawImage(canvasRef.value, 0, 0)
  const link = document.createElement('a')
  link.download = `CORONG_${selectedColor.value.code}_试妆.png`
  link.href = merged.toDataURL()
  link.click()
}

onUnmounted(() => {
  isRunning = false
  if (animationId) cancelAnimationFrame(animationId)
  if (stream) stream.getTracks().forEach(t => t.stop())
})
</script>

<style scoped>
.ar-page { max-width: 1100px; margin: 0 auto; padding: 48px 24px; }
.page-header { text-align: center; margin-bottom: 32px; }
.page-header h1 { font-size: 2.2rem; font-weight: 700; margin-bottom: 12px; }
.page-header p { color: #888; }

.color-picker { display: flex; justify-content: center; gap: 16px; flex-wrap: wrap; margin-bottom: 32px; }
.color-item { display: flex; flex-direction: column; align-items: center; gap: 6px; cursor: pointer; transition: transform 0.2s; }
.color-item:hover { transform: scale(1.1); }
.color-dot { width: 44px; height: 44px; border-radius: 50%; box-shadow: 0 2px 8px rgba(0,0,0,0.15); transition: box-shadow 0.2s; }
.color-item.active .color-dot { box-shadow: 0 0 0 3px #fff, 0 0 0 5px #d94a87; }
.color-item span { font-size: 0.75rem; color: #666; }

.ar-container { display: grid; grid-template-columns: 1fr 280px; gap: 24px; margin-bottom: 64px; }

.camera-wrap { position: relative; border-radius: 20px; background: #1a1a1a; aspect-ratio: 4/3; overflow: hidden; }

.ar-video {
  position: absolute; top: 0; left: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  transform: scaleX(-1);
  z-index: 1;
}

.ar-canvas {
  position: absolute; top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 2;
  pointer-events: none;
}

.camera-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 3; }
.overlay-content { text-align: center; color: #fff; }
.overlay-icon { font-size: 3rem; margin-bottom: 16px; }
.overlay-content p { margin-bottom: 20px; font-size: 1rem; opacity: 0.8; }

.start-btn { background: #d94a87; color: #fff; border: none; padding: 12px 32px; border-radius: 50px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.2s; }
.start-btn:hover { background: #c03878; transform: scale(1.05); }

.spinner { width: 40px; height: 40px; border: 3px solid rgba(255,255,255,0.2); border-top-color: #fff; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 16px; }
@keyframes spin { to { transform: rotate(360deg); } }

.ar-badge { position: absolute; bottom: 16px; left: 16px; background: rgba(0,0,0,0.6); color: #fff; padding: 6px 14px; border-radius: 20px; font-size: 0.82rem; display: flex; align-items: center; gap: 8px; z-index: 3; }
.ar-badge span { width: 12px; height: 12px; border-radius: 50%; display: inline-block; }

.ar-controls { display: flex; flex-direction: column; gap: 20px; }
.control-section h3 { font-size: 0.85rem; color: #888; margin-bottom: 10px; font-weight: 500; }

.current-color { display: flex; align-items: center; gap: 12px; background: #fff; border-radius: 12px; padding: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
.current-dot { width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0; box-shadow: 0 2px 8px rgba(0,0,0,0.15); }
.current-color strong { display: block; font-size: 0.95rem; }
.current-color p { font-size: 0.8rem; color: #888; margin: 0; }

.slider { width: 100%; accent-color: #d94a87; }
.slider-labels { display: flex; justify-content: space-between; font-size: 0.75rem; color: #aaa; margin-top: 4px; }

.finish-btns { display: flex; gap: 8px; }
.finish-btn { flex: 1; padding: 8px; border: 1.5px solid #e0e0e0; border-radius: 8px; background: transparent; font-size: 0.82rem; cursor: pointer; transition: all 0.2s; color: #666; }
.finish-btn.active { background: #d94a87; border-color: #d94a87; color: #fff; }

.buy-now-btn { display: block; background: #ee4d2d; color: #fff; text-align: center; padding: 12px; border-radius: 12px; font-weight: 600; font-size: 0.9rem; transition: opacity 0.2s; }
.buy-now-btn:hover { opacity: 0.85; }

.screenshot-btn { width: 100%; padding: 12px; border: 1.5px solid #d94a87; background: transparent; color: #d94a87; border-radius: 12px; font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: all 0.2s; }
.screenshot-btn:hover { background: #d94a87; color: #fff; }

.all-colors h2 { font-size: 1.8rem; font-weight: 700; margin-bottom: 24px; }
.colors-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 16px; }
.color-card { background: #fff; border-radius: 16px; padding: 20px 16px; text-align: center; box-shadow: 0 4px 16px rgba(0,0,0,0.06); cursor: pointer; transition: all 0.3s; border: 2px solid transparent; }
.color-card:hover { transform: translateY(-4px); }
.color-card.active { border-color: #d94a87; }
.color-swatch { width: 48px; height: 48px; border-radius: 50%; margin: 0 auto 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
.color-card strong { display: block; font-size: 0.9rem; margin-bottom: 4px; }
.color-card span { font-size: 0.82rem; color: #666; display: block; margin-bottom: 6px; }
.color-card p { font-size: 0.75rem; color: #aaa; line-height: 1.4; }

@media (max-width: 768px) {
  .ar-page { padding: 24px 16px; }
  .page-header h1 { font-size: 1.6rem; }
  .ar-container { grid-template-columns: 1fr; }
  .colors-grid { grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .color-card { padding: 14px 10px; }
  .color-swatch { width: 36px; height: 36px; }
}
</style>
