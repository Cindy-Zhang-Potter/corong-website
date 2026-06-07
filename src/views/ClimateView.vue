<template>
  <div class="climate-page">

    <div class="page-header">
      <h1>{{ t('climate.title') }}</h1>
      <p>{{ t('climate.subtitle') }}</p>
    </div>

    <div class="weather-section">
      <div v-if="loading" class="loading">{{ t('common.loading') }}</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else class="weather-grid">

        <div class="weather-card main-card">
          <div class="location">📍 {{ locationName }}</div>
          <div class="temp">{{ weather.temp }}°C</div>
          <div class="weather-desc">{{ weatherDesc }}</div>
        </div>

        <div class="weather-card">
          <div class="card-icon">💧</div>
          <div class="card-label">{{ t('climate.humidity') }}</div>
          <div class="card-value">{{ weather.humidity }}%</div>
          <div class="card-bar">
            <div class="bar-fill" :style="{ width: weather.humidity + '%', background: humidityColor }"></div>
          </div>
        </div>

        <div class="weather-card">
          <div class="card-icon">🌡️</div>
          <div class="card-label">{{ t('climate.temp') }}</div>
          <div class="card-value">{{ weather.temp }}°C</div>
          <div class="card-bar">
            <div class="bar-fill" :style="{ width: Math.min(weather.temp / 45 * 100, 100) + '%', background: tempColor }"></div>
          </div>
        </div>

        <div class="weather-card">
          <div class="card-icon">☀️</div>
          <div class="card-label">{{ t('climate.uv') }}</div>
          <div class="card-value">{{ weather.uv }}</div>
          <div class="card-bar">
            <div class="bar-fill" :style="{ width: Math.min(weather.uv / 11 * 100, 100) + '%', background: uvColor }"></div>
          </div>
        </div>

        <div class="weather-card risk-card">
          <div class="card-label">{{ t('climate.risk') }}</div>
          <div class="risk-gauge">
            <svg viewBox="0 0 120 70" width="160">
              <path d="M10 65 A50 50 0 0 1 110 65" fill="none" stroke="#eee" stroke-width="12" stroke-linecap="round"/>
              <path d="M10 65 A50 50 0 0 1 110 65" fill="none"
                :stroke="riskColor" stroke-width="12" stroke-linecap="round"
                :stroke-dasharray="`${riskScore * 1.57} 157`"/>
              <text x="60" y="62" text-anchor="middle" font-size="18" font-weight="700" :fill="riskColor">{{ riskScore }}</text>
            </svg>
          </div>
          <div class="risk-label" :style="{ color: riskColor }">{{ riskLevel }}</div>
        </div>

      </div>
    </div>

    <div class="advice-section">
      <h2>{{ t('climate.advice_title') }}</h2>
      <div class="advice-grid">
        <div v-for="item in adviceList" :key="item.titleKey" class="advice-card">
          <div class="advice-icon">{{ item.icon }}</div>
          <div class="advice-content">
            <h3>{{ t(item.titleKey) }}</h3>
            <p>{{ t(item.descKey) }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="product-section">
      <h2>{{ t('climate.product_title') }}</h2>
      <div class="product-grid">
        <div v-for="p in recommendedProducts" :key="p.nameKey" class="product-card">
          <div class="product-emoji">{{ p.emoji }}</div>
          <h3>{{ t(p.nameKey) }}</h3>
          <p>{{ t(p.descKey) }}</p>
          <a :href="p.shopeeUrl" target="_blank" class="buy-btn">{{ t('common.shopee') }} →</a>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const loading = ref(true)
const error = ref('')
const locationName = ref('...')
const weather = ref({ temp: 0, humidity: 0, uv: 0 })

onMounted(async () => {
  try {
    const pos = await new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 6000 })
    ).catch(() => null)

    let lat = 13.75, lon = 100.52
    if (pos) {
      lat = pos.coords.latitude
      lon = pos.coords.longitude
    }

    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 2000)
      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
        { signal: controller.signal }
      )
      clearTimeout(timeout)
      const geoData = await geoRes.json()
      locationName.value = geoData.address?.city || geoData.address?.town || geoData.address?.state || t('climate.current_location')
    } catch { locationName.value = t('climate.current_location') }

    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,uv_index&timezone=auto`
    )
    const data = await res.json()
    weather.value = {
      temp: Math.round(data.current.temperature_2m),
      humidity: data.current.relative_humidity_2m,
      uv: Math.round(data.current.uv_index ?? 0),
    }
  } catch (e) {
    error.value = t('climate.error')
  } finally {
    loading.value = false
  }
})

const riskScore = computed(() => {
  const h = weather.value.humidity
  const t2 = weather.value.temp
  const uv = weather.value.uv
  return Math.min(100, Math.round(h * 0.5 + t2 * 1.2 + uv * 2))
})

const riskColor = computed(() => {
  if (riskScore.value < 40) return '#4caf50'
  if (riskScore.value < 70) return '#ff9800'
  return '#f44336'
})

const riskLevel = computed(() => {
  if (riskScore.value < 40) return t('climate.risk_low')
  if (riskScore.value < 70) return t('climate.risk_mid')
  return t('climate.risk_high')
})

const weatherDesc = computed(() => {
  const h = weather.value.humidity
  const t2 = weather.value.temp
  if (t2 > 35) return t('climate.desc_hot')
  if (h > 80) return t('climate.desc_humid')
  if (t2 < 20) return t('climate.desc_cool')
  return t('climate.desc_normal')
})

const humidityColor = computed(() => weather.value.humidity > 70 ? '#f44336' : '#4caf50')
const tempColor = computed(() => weather.value.temp > 33 ? '#f44336' : '#ff9800')
const uvColor = computed(() => weather.value.uv > 6 ? '#f44336' : '#ff9800')

const adviceList = computed(() => {
  const h = weather.value.humidity
  const uv = weather.value.uv
  return [
    {
      icon: '🧴',
      titleKey: 'climate.advice_primer_title',
      descKey: h > 75 ? 'climate.advice_primer_humid' : 'climate.advice_primer_normal',
    },
    {
      icon: '☀️',
      titleKey: 'climate.advice_spf_title',
      descKey: uv > 6 ? 'climate.advice_spf_high' : 'climate.advice_spf_normal',
    },
    {
      icon: '💄',
      titleKey: 'climate.advice_foundation_title',
      descKey: h > 75 ? 'climate.advice_foundation_humid' : 'climate.advice_foundation_normal',
    },
    {
      icon: '🌸',
      titleKey: 'climate.advice_setting_title',
      descKey: h > 75 ? 'climate.advice_setting_humid' : 'climate.advice_setting_normal',
    },
  ]
})

const recommendedProducts = computed(() => [
  {
    emoji: '💧',
    nameKey: 'climate.product1_name',
    descKey: weather.value.humidity > 75 ? 'climate.product1_humid' : 'climate.product1_normal',
    shopeeUrl: 'https://shopee.co.th',
  },
  {
    emoji: '✨',
    nameKey: 'climate.product2_name',
    descKey: 'climate.product2_desc',
    shopeeUrl: 'https://shopee.co.th',
  },
  {
    emoji: '🛡️',
    nameKey: 'climate.product3_name',
    descKey: weather.value.uv > 6 ? 'climate.product3_uv' : 'climate.product3_normal',
    shopeeUrl: 'https://shopee.co.th',
  },
])
</script>

<style scoped>
.climate-page { max-width: 1100px; margin: 0 auto; padding: 48px 24px; }
.page-header { text-align: center; margin-bottom: 48px; }
.page-header h1 { font-size: 2.2rem; font-weight: 700; color: #1a1a1a; margin-bottom: 12px; }
.page-header p { color: #888; font-size: 1rem; }

.loading, .error { text-align: center; padding: 60px; color: #888; font-size: 1.1rem; }

.weather-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr; gap: 16px; margin-bottom: 48px; }
.weather-card { background: #fff; border-radius: 16px; padding: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
.main-card { display: flex; flex-direction: column; justify-content: center; }
.location { font-size: 0.85rem; color: #888; margin-bottom: 8px; }
.temp { font-size: 3.5rem; font-weight: 800; color: #d94a87; line-height: 1; margin-bottom: 8px; }
.weather-desc { font-size: 0.9rem; color: #666; }
.card-icon { font-size: 1.5rem; margin-bottom: 8px; }
.card-label { font-size: 0.8rem; color: #888; margin-bottom: 4px; }
.card-value { font-size: 1.6rem; font-weight: 700; color: #1a1a1a; margin-bottom: 12px; }
.card-bar { height: 6px; background: #f0f0f0; border-radius: 3px; overflow: hidden; }
.bar-fill { height: 100%; border-radius: 3px; transition: width 1s ease; }
.risk-card { text-align: center; }
.risk-gauge { display: flex; justify-content: center; margin: 8px 0; }
.risk-label { font-weight: 600; font-size: 0.9rem; }

.advice-section { margin-bottom: 48px; }
.advice-section h2, .product-section h2 { font-size: 1.6rem; font-weight: 700; margin-bottom: 24px; color: #1a1a1a; }
.advice-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.advice-card { background: #fff; border-radius: 12px; padding: 20px; display: flex; gap: 16px; box-shadow: 0 4px 16px rgba(0,0,0,0.05); }
.advice-icon { font-size: 2rem; flex-shrink: 0; }
.advice-content h3 { font-size: 1rem; font-weight: 600; margin-bottom: 6px; }
.advice-content p { font-size: 0.88rem; color: #666; line-height: 1.5; }

.product-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.product-card { background: #fff; border-radius: 16px; padding: 28px 24px; text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,0.06); transition: transform 0.3s; }
.product-card:hover { transform: translateY(-4px); }
.product-emoji { font-size: 2.5rem; margin-bottom: 12px; }
.product-card h3 { font-size: 1rem; font-weight: 600; margin-bottom: 8px; }
.product-card p { font-size: 0.85rem; color: #888; margin-bottom: 16px; line-height: 1.5; }
.buy-btn { display: inline-block; background: #ee4d2d; color: #fff; padding: 8px 20px; border-radius: 20px; font-size: 0.85rem; font-weight: 600; transition: opacity 0.2s; }
.buy-btn:hover { opacity: 0.85; }

@media (max-width: 768px) {
  .climate-page { padding: 24px 16px; }
  .weather-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
  .weather-card.main-card { grid-column: 1 / -1; }
  .risk-card { grid-column: 1 / -1; }
  .advice-grid { grid-template-columns: 1fr; }
  .product-grid { grid-template-columns: 1fr; }
  .page-header h1 { font-size: 1.6rem; }
}
</style>
