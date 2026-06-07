<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <p class="hero-eyebrow">{{ t('hero.subtitle') }}</p>
        <h1 class="hero-title">CORONG <span>蔻容</span></h1>
        <p class="hero-slogan">{{ t('hero.slogan') }}</p>
        <div class="hero-btns">
          <router-link to="/climate" class="btn-primary">{{ t('hero.cta') }}</router-link>
          <a href="https://shopee.co.th" target="_blank" class="btn-secondary">{{ t('common.shopee') }}</a>
        </div>
      </div>
      <div class="hero-visual">
        <div class="hero-circle">
          <div class="hero-circle-inner"><span>✨</span></div>
        </div>
      </div>
    </section>

    <section class="features">
      <h2 class="section-title">{{ t('features.title') }}</h2>
      <div class="features-grid">
        <router-link to="/climate" class="feature-card">
          <div class="feature-icon">🌤️</div>
          <h3>{{ t('nav.climate') }}</h3>
          <p>{{ t('features.climate_desc') }}</p>
        </router-link>
        <router-link to="/skin" class="feature-card">
          <div class="feature-icon">🎨</div>
          <h3>{{ t('nav.skin') }}</h3>
          <p>{{ t('features.skin_desc') }}</p>
        </router-link>
        <router-link to="/ugc" class="feature-card">
          <div class="feature-icon">📸</div>
          <h3>{{ t('nav.ugc') }}</h3>
          <p>{{ t('features.ugc_desc') }}</p>
        </router-link>
        <router-link to="/science" class="feature-card">
          <div class="feature-icon">🔬</div>
          <h3>{{ t('nav.science') }}</h3>
          <p>{{ t('features.science_desc') }}</p>
        </router-link>
      </div>
    </section>

    <section class="stats">
      <div class="stat-item">
        <span class="stat-num">38°C</span>
        <span class="stat-label">{{ t('stats.temp_label') }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-num">90%</span>
        <span class="stat-label">{{ t('stats.humidity_label') }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-num">3</span>
        <span class="stat-label">{{ t('stats.langs_label') }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-num">AI</span>
        <span class="stat-label">{{ t('stats.ai_label') }}</span>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<style scoped>
.home { width: 100%; }

.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 80px 8%;
  background: linear-gradient(135deg, #fff0f6 0%, #fdf6f9 60%, #f0e6ff 100%);
  min-height: 520px;
}

.hero-eyebrow {
  color: #d94a87;
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 2px;
  margin-bottom: 16px;
}

.hero-title {
  font-size: 4rem;
  font-weight: 800;
  color: #1a1a1a;
  line-height: 1.1;
  margin-bottom: 20px;
}

.hero-title span { color: #d94a87; }

.hero-slogan {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 40px;
  max-width: 420px;
}

.hero-btns { display: flex; gap: 16px; flex-wrap: wrap; }

.btn-primary {
  background: #d94a87;
  color: #fff;
  padding: 14px 32px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.2s;
  box-shadow: 0 4px 20px rgba(217,74,135,0.3);
}

.btn-primary:hover {
  background: #c03878;
  transform: translateY(-2px);
}

.btn-secondary {
  border: 2px solid #d94a87;
  color: #d94a87;
  padding: 14px 32px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.2s;
}

.btn-secondary:hover { background: #d94a87; color: #fff; }

.hero-visual { flex-shrink: 0; }

.hero-circle {
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: linear-gradient(135deg, #d94a87, #ff8cc8);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 20px 60px rgba(217,74,135,0.3);
  animation: float 4s ease-in-out infinite;
}

.hero-circle-inner {
  width: 240px;
  height: 240px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 80px;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-16px); }
}

.features { padding: 80px 8%; }

.section-title {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 48px;
  color: #1a1a1a;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.feature-card {
  background: #fff;
  border-radius: 16px;
  padding: 36px 24px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  transition: all 0.3s;
  color: inherit;
  display: block;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(217,74,135,0.15);
}

.feature-icon { font-size: 2.5rem; margin-bottom: 16px; }
.feature-card h3 { font-size: 1.1rem; font-weight: 600; margin-bottom: 10px; color: #1a1a1a; }
.feature-card p { font-size: 0.9rem; color: #888; line-height: 1.6; }

.stats {
  background: #d94a87;
  padding: 60px 8%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 32px;
}

.stat-item { text-align: center; color: #fff; }
.stat-num { display: block; font-size: 3rem; font-weight: 800; line-height: 1; margin-bottom: 8px; }
.stat-label { font-size: 0.95rem; opacity: 0.85; }

@media (max-width: 768px) {
  .hero {
    flex-direction: column;
    padding: 48px 6%;
    min-height: auto;
    text-align: center;
  }

  .hero-title { font-size: 2.6rem; }
  .hero-slogan { font-size: 1rem; }
  .hero-btns { justify-content: center; }

  .hero-visual { margin-top: 40px; }
  .hero-circle { width: 200px; height: 200px; }
  .hero-circle-inner { width: 150px; height: 150px; font-size: 50px; }

  .features { padding: 48px 6%; }
  .section-title { font-size: 1.5rem; margin-bottom: 28px; }

  .features-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .feature-card { padding: 24px 16px; }
  .feature-icon { font-size: 2rem; }
  .feature-card h3 { font-size: 0.95rem; }
  .feature-card p { font-size: 0.82rem; }

  .stats { padding: 40px 6%; gap: 24px; }
  .stat-num { font-size: 2.2rem; }
  .stat-label { font-size: 0.82rem; }
}
</style>
