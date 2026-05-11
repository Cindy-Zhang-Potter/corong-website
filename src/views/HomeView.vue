<template>
  <div class="home">

    <!-- Hero区域 -->
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
          <div class="hero-circle-inner">
            <span>✨</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 四大功能入口 -->
    <section class="features">
      <h2 class="section-title">我们能为你做什么</h2>
      <div class="features-grid">
        <router-link to="/climate" class="feature-card">
          <div class="feature-icon">🌤️</div>
          <h3>{{ t('nav.climate') }}</h3>
          <p>根据实时天气，给出最适合你的妆容建议</p>
        </router-link>
        <router-link to="/skin" class="feature-card">
          <div class="feature-icon">🎨</div>
          <h3>{{ t('nav.skin') }}</h3>
          <p>AI分析你的肤色，精准匹配最适合的产品色号</p>
        </router-link>
        <router-link to="/ugc" class="feature-card">
          <div class="feature-icon">📸</div>
          <h3>{{ t('nav.ugc') }}</h3>
          <p>上传你的妆容，获得兰纳积分，加入美妆社区</p>
        </router-link>
        <router-link to="/science" class="feature-card">
          <div class="feature-icon">🔬</div>
          <h3>{{ t('nav.science') }}</h3>
          <p>了解我们的核心成分与科研背景</p>
        </router-link>
      </div>
    </section>

    <!-- 数据亮点 -->
    <section class="stats">
      <div class="stat-item">
        <span class="stat-num">38°C</span>
        <span class="stat-label">泰国极端气温</span>
      </div>
      <div class="stat-item">
        <span class="stat-num">90%</span>
        <span class="stat-label">平均相对湿度</span>
      </div>
      <div class="stat-item">
        <span class="stat-num">3</span>
        <span class="stat-label">支持语言</span>
      </div>
      <div class="stat-item">
        <span class="stat-num">AI</span>
        <span class="stat-label">智能肤色分析</span>
      </div>
    </section>

  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<style scoped>
.home {
  width: 100%;
}

/* Hero */
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

.hero-title span {
  color: #d94a87;
}

.hero-slogan {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 40px;
  max-width: 420px;
}

.hero-btns {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

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
  box-shadow: 0 8px 28px rgba(217,74,135,0.4);
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

.btn-secondary:hover {
  background: #d94a87;
  color: #fff;
}

/* Hero visual */
.hero-visual {
  flex-shrink: 0;
}

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

/* Features */
.features {
  padding: 80px 8%;
}

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

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 16px;
}

.feature-card h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: #1a1a1a;
}

.feature-card p {
  font-size: 0.9rem;
  color: #888;
  line-height: 1.6;
}

/* Stats */
.stats {
  background: #d94a87;
  padding: 60px 8%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 32px;
}

.stat-item {
  text-align: center;
  color: #fff;
}

.stat-num {
  display: block;
  font-size: 3rem;
  font-weight: 800;
  line-height: 1;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 0.95rem;
  opacity: 0.85;
}
</style>