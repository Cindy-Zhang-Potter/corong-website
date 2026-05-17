<template>
  <div class="ar-page">
    <div class="page-header">
      <h1>AR 试妆</h1>
      <p>实时预览口红效果，找到最适合你的CORONG色号</p>
    </div>

    <!-- 颜色选择器 -->
    <div class="color-picker">
      <div v-for="color in lipColors" :key="color.code"
        class="color-item"
        :class="{ active: selectedColor.code === color.code }"
        @click="selectedColor = color">
        <div class="color-dot" :style="{ background: color.hex }"></div>
        <span>{{ color.name }}</span>
      </div>
    </div>

    <!-- 主体区域 -->
    <div class="ar-container">

      <!-- 摄像头+Canvas叠加 -->
      <div class="camera-wrap">
        <video ref="videoRef" autoplay playsinline muted class="ar-video"></video>
        <canvas ref="canvasRef" class="ar-canvas"></canvas>
        <div v-if="!started" class="camera-overlay">
          <div class="overlay-content">
            <div class="overlay-icon">💄</div>
            <p>点击开启AR试妆</p>
            <button class="start-btn" @click="startAR">开启摄像头</button>
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
          {{ selectedColor.name }} · 实时AR
        </div>
      </div>

      <!-- 右侧控制 -->
      <div class="ar-controls">
        <div class="control-section">
          <h3>当前色号</h3>
          <div class="current-color">
            <div class="current-dot" :style="{ background: selectedColor.hex }"></div>
            <div>
              <strong>{{ selectedColor.code }}</strong>
              <p>{{ selectedColor.name }}</p>
            </div>
          </div>
        </div>

        <div class="control-section">
          <h3>透明度</h3>
          <input type="range" v-model="opacity" min="20" max="80" class="slider"/>
          <div class="slider-labels">
            <span>自然</span><span>浓郁</span>
          </div>
        </div>

        <div class="control-section">
          <h3>妆感</h3>
          <div class="finish-btns">
            <button v-for="f in finishTypes" :key="f"
              :class="['finish-btn', { active: selectedFinish === f }]"
              @click="selectedFinish = f">{{ f }}</button>
          </div>
        </div>

        <a :href="'https://shopee.co.th'" target="_blank" class="buy-now-btn">
          🛒 购买 {{ selectedColor.code }} 色号
        </a>

        <button v-if="started" class="screenshot-btn" @click="takeScreenshot">
          📸 截图保存
        </button>
      </div>
    </div>

    <!-- 所有色号展示 -->
    <div class="all-colors">
      <h2>CORONG 全系口红色号</h2>
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
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as faceapi from '@vladmandic/face-api'

const videoRef = ref(null)
const canvasRef = ref(null)
const started = ref(false)
const loading = ref(false)
const loadingText = ref('加载AI模型...')
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

async function startAR() {
  loading.value = true
  loadingText.value = '加载AI模型...'

  try {
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models')
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models')

    loadingText.value = '开启摄像头...'
    stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } })
    videoRef.value.srcObject = stream

    await new Promise(r => videoRef.value.onloadedmetadata = r)

    canvasRef.value.width = videoRef.value.videoWidth
    canvasRef.value.height = videoRef.value.videoHeight

    started.value = true
    loading.value = false
    detectLoop()
  } catch (e) {
    loading.value = false
    alert('无法开启摄像头：' + e.message)
  }
}

async function detectLoop() {
  if (!videoRef.value || !canvasRef.value) return

  const ctx = canvasRef.value.getContext('2d')
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)

  const detection = await faceapi
    .detectSingleFace(videoRef.value, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks()

  if (detection) {
    console.log('检测到人脸！', detection.landmarks.getMouth())
    drawLipstick(ctx, detection.landmarks)
  } else {
    console.log('未检测到人脸')
  }
  animationId = requestAnimationFrame(detectLoop)
}

function drawLipstick(ctx, landmarks) {
  const mouth = landmarks.getMouth()
  const canvasWidth = canvasRef.value.width
  const canvasHeight = canvasRef.value.height
  
  ctx.clearRect(0, 0, canvasWidth, canvasHeight)
  
  mouth.forEach((p, i) => {
    const x = p.x
    const y = p.y
    ctx.beginPath()
    ctx.arc(x, y, 6, 0, Math.PI * 2)
    ctx.fillStyle = 'red'
    ctx.fill()
    ctx.fillStyle = 'white'
    ctx.font = '12px Arial'
    ctx.fillText(i, x + 8, y)
  })
}

function takeScreenshot() {
  const merged = document.createElement('canvas')
  merged.width = canvasRef.value.width
  merged.height = canvasRef.value.height
  const ctx = merged.getContext('2d')
  ctx.drawImage(videoRef.value, 0, 0)
  ctx.drawImage(canvasRef.value, 0, 0)
  const link = document.createElement('a')
  link.download = `CORONG_${selectedColor.value.code}_试妆.png`
  link.href = merged.toDataURL()
  link.click()
}

watch(selectedColor, () => {})

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
  if (stream) stream.getTracks().forEach(t => t.stop())
})
</script>

<style scoped>
.ar-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 48px 24px;
}

.page-header {
  text-align: center;
  margin-bottom: 32px;
}

.page-header h1 { font-size: 2.2rem; font-weight: 700; margin-bottom: 12px; }
.page-header p { color: #888; }

/* Color picker */
.color-picker {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 32px;
}

.color-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: transform 0.2s;
}

.color-item:hover { transform: scale(1.1); }

.color-dot {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  transition: box-shadow 0.2s;
}

.color-item.active .color-dot {
  box-shadow: 0 0 0 3px #fff, 0 0 0 5px #d94a87;
}

.color-item span { font-size: 0.75rem; color: #666; }

/* AR Container */
.ar-container {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 24px;
  margin-bottom: 64px;
}

.camera-wrap {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  background: #1a1a1a;
  aspect-ratio: 4/3;
}

.ar-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scaleX(-1);
}

.ar-canvas {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
}

.camera-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay-content { text-align: center; color: #fff; }
.overlay-icon { font-size: 3rem; margin-bottom: 16px; }
.overlay-content p { margin-bottom: 20px; font-size: 1rem; opacity: 0.8; }

.start-btn {
  background: #d94a87;
  color: #fff;
  border: none;
  padding: 12px 32px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.start-btn:hover { background: #c03878; transform: scale(1.05); }

.spinner {
  width: 40px; height: 40px;
  border: 3px solid rgba(255,255,255,0.2);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin { to { transform: rotate(360deg); } }

.ar-badge {
  position: absolute;
  bottom: 16px; left: 16px;
  background: rgba(0,0,0,0.6);
  color: #fff;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.82rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.ar-badge span {
  width: 12px; height: 12px;
  border-radius: 50%;
  display: inline-block;
}

/* Controls */
.ar-controls {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.control-section h3 {
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 10px;
  font-weight: 500;
}

.current-color {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #fff;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.current-dot {
  width: 40px; height: 40px;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.current-color strong { display: block; font-size: 0.95rem; }
.current-color p { font-size: 0.8rem; color: #888; margin: 0; }

.slider {
  width: 100%;
  accent-color: #d94a87;
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #aaa;
  margin-top: 4px;
}

.finish-btns { display: flex; gap: 8px; }

.finish-btn {
  flex: 1;
  padding: 8px;
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  background: transparent;
  font-size: 0.82rem;
  cursor: pointer;
  transition: all 0.2s;
  color: #666;
}

.finish-btn.active { background: #d94a87; border-color: #d94a87; color: #fff; }

.buy-now-btn {
  display: block;
  background: #ee4d2d;
  color: #fff;
  text-align: center;
  padding: 12px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: opacity 0.2s;
}

.buy-now-btn:hover { opacity: 0.85; }

.screenshot-btn {
  width: 100%;
  padding: 12px;
  border: 1.5px solid #d94a87;
  background: transparent;
  color: #d94a87;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.screenshot-btn:hover { background: #d94a87; color: #fff; }

/* All colors */
.all-colors h2 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 24px;
}

.colors-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
}

.color-card {
  background: #fff;
  border-radius: 16px;
  padding: 20px 16px;
  text-align: center;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  cursor: pointer;
  transition: all 0.3s;
  border: 2px solid transparent;
}

.color-card:hover { transform: translateY(-4px); }
.color-card.active { border-color: #d94a87; }

.color-swatch {
  width: 48px; height: 48px;
  border-radius: 50%;
  margin: 0 auto 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.color-card strong { display: block; font-size: 0.9rem; margin-bottom: 4px; }
.color-card span { font-size: 0.82rem; color: #666; display: block; margin-bottom: 6px; }
.color-card p { font-size: 0.75rem; color: #aaa; line-height: 1.4; }
</style>