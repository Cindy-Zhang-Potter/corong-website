<template>
  <div class="home">

    <!-- Hero区域 -->
    <section class="hero">
      <div class="hero-content">
        <p class="hero-eyebrow">{{ t('hero.subtitle') }}</p>
        <h1 class="hero-title">KOURONG <span>蔻蓉</span></h1>
        <p class="hero-slogan">{{ t('hero.slogan') }}</p>
        <div class="hero-btns">
          <router-link to="/climate" class="btn-primary">{{ t('hero.cta') }}</router-link>
          <a href="https://shopee.co.th" target="_blank" class="btn-secondary">{{ t('common.shopee') }}</a>
        </div>
      </div>

      <div class="hero-visual">
        <div class="product-showcase">
          <div class="showcase-bg"></div>
          <div class="product-main">
            <svg viewBox="0 0 120 220" width="110" class="bottle-svg">
              <rect x="42" y="8" width="36" height="28" rx="8" fill="#c0336e"/>
              <rect x="46" y="12" width="28" height="20" rx="6" fill="#d94a87"/>
              <rect x="30" y="36" width="60" height="150" rx="20" fill="url(#bottleGrad)"/>
              <rect x="38" y="50" width="12" height="80" rx="6" fill="rgba(255,255,255,0.3)"/>
              <text x="60" y="110" text-anchor="middle" font-family="Georgia,serif" font-size="8" fill="white" font-weight="700" letter-spacing="1">KOURONG</text>
              <text x="60" y="124" text-anchor="middle" font-family="Georgia,serif" font-size="6" fill="rgba(255,255,255,0.8)" letter-spacing="2">蔻  蓉</text>
              <g transform="translate(60, 150)">
                <ellipse cx="0" cy="-10" rx="3" ry="7" fill="rgba(255,255,255,0.6)" transform="rotate(0)"/>
                <ellipse cx="0" cy="-10" rx="3" ry="7" fill="rgba(255,255,255,0.6)" transform="rotate(60)"/>
                <ellipse cx="0" cy="-10" rx="3" ry="7" fill="rgba(255,255,255,0.6)" transform="rotate(120)"/>
                <ellipse cx="0" cy="-10" rx="3" ry="7" fill="rgba(255,255,255,0.6)" transform="rotate(180)"/>
                <ellipse cx="0" cy="-10" rx="3" ry="7" fill="rgba(255,255,255,0.6)" transform="rotate(240)"/>
                <ellipse cx="0" cy="-10" rx="3" ry="7" fill="rgba(255,255,255,0.6)" transform="rotate(300)"/>
                <circle cx="0" cy="0" r="4" fill="rgba(255,255,255,0.8)"/>
              </g>
              <defs>
                <linearGradient id="bottleGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="#c0336e"/>
                  <stop offset="50%" stop-color="#d94a87"/>
                  <stop offset="100%" stop-color="#e8659a"/>
                </linearGradient>
              </defs>
            </svg>
            <div class="product-label">
              <strong>智能持妆粉底液</strong>
              <span>Smart Long-wear Foundation</span>
            </div>
          </div>

          <div class="product-secondary product-left">
            <svg viewBox="0 0 90 90" width="72">
              <rect x="5" y="5" width="80" height="80" rx="16" fill="url(#compactGrad)"/>
              <rect x="12" y="12" width="66" height="66" rx="12" fill="rgba(255,255,255,0.15)"/>
              <circle cx="45" cy="45" r="24" fill="rgba(255,255,255,0.2)"/>
              <circle cx="45" cy="45" r="16" fill="rgba(255,255,255,0.3)"/>
              <text x="45" y="49" text-anchor="middle" font-family="Georgia,serif" font-size="6" fill="white" font-weight="700">KOURONG</text>
              <defs>
                <linearGradient id="compactGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#e8659a"/>
                  <stop offset="100%" stop-color="#a0254e"/>
                </linearGradient>
              </defs>
            </svg>
            <span>定妆散粉</span>
          </div>

          <div class="product-secondary product-right">
            <svg viewBox="0 0 80 130" width="60">
              <ellipse cx="40" cy="18" rx="22" ry="14" fill="#c0336e"/>
              <ellipse cx="40" cy="14" rx="18" ry="10" fill="#d94a87"/>
              <rect x="18" y="18" width="44" height="90" rx="12" fill="url(#tubeGrad)"/>
              <rect x="24" y="28" width="8" height="50" rx="4" fill="rgba(255,255,255,0.25)"/>
              <text x="40" y="68" text-anchor="middle" font-family="Georgia,serif" font-size="6" fill="white" font-weight="700">KOURONG</text>
              <rect x="18" y="108" width="44" height="10" rx="4" fill="#a0254e"/>
              <defs>
                <linearGradient id="tubeGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="#b8305e"/>
                  <stop offset="100%" stop-color="#e8659a"/>
                </linearGradient>
              </defs>
            </svg>
            <span>控油妆前乳</span>
          </div>

          <div class="deco-flower deco-1">🌸</div>
          <div class="deco-flower deco-2">✨</div>
          <div class="deco-flower deco-3">🌺</div>
          <div class="tag-badge tag-1"><span>纳米技术</span><small>专利申请中</small></div>
          <div class="tag-badge tag-2"><span>≥8H</span><small>35°C持妆</small></div>
        </div>
      </div>
    </section>

    <!-- 真实产品概念图展示 -->
    <section class="product-gallery">
      <h2 class="section-title">产品系列</h2>
      <p class="section-sub">兰纳草本 × 纳米技术 × 东南亚气候适配</p>
      <div class="gallery-grid">
        <div class="gallery-card">
          <img src="/product-foundation.png" alt="KOURONG 智能持妆粉底液"/>
          <div class="gallery-info">
            <h3>智能持妆粉底液</h3>
            <p>多孔二氧化硅 + 疏水高岭土 · 35°C+/80%+环境≥8小时持妆</p>
            <div class="gallery-tags">
              <span>W01 Porcelain</span>
              <span>W02 Natural</span>
              <span>W03 Warm Tone</span>
              <span>W04 Wheat</span>
            </div>
          </div>
        </div>
        <div class="gallery-card">
          <img src="/product-powder.png" alt="KOURONG 定妆散粉"/>
          <div class="gallery-info">
            <h3>兰纳定妆散粉</h3>
            <p>银锌沸石-余甘子三层纳米结构 · 热响应缓释 · 持效6-8小时</p>
            <div class="gallery-tags">
              <span>控油吸附≥2.5g/g</span>
              <span>99.9%抑菌</span>
            </div>
          </div>
        </div>
        <div class="gallery-card">
          <img src="/product-primer-1.png" alt="KOURONG 控油妆前乳"/>
          <div class="gallery-info">
            <h3>控油长效妆前乳</h3>
            <p>Lakoocha羟基白藜芦醇 · 抗氧化防底妆发黑 · SPF30防晒</p>
            <div class="gallery-tags">
              <span>Thai Herbal Extract</span>
              <span>SPF30</span>
            </div>
          </div>
        </div>
        <div class="gallery-card">
          <img src="/product-primer-2.jpg" alt="KOURONG 夏日控油"/>
          <div class="gallery-info">
            <h3>夏日控油系列</h3>
            <p>高温稳定配方 · 均匀肤色提亮 · 夏日清爽一整天</p>
            <div class="gallery-tags">
              <span>Oil Control</span>
              <span>Long Lasting</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 四大功能入口 -->
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

    <!-- 数据亮点 -->
    <section class="stats">
      <div class="stat-item">
        <span class="stat-num">47.5亿</span>
        <span class="stat-label">{{ t('stats.temp_label') }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-num">73%</span>
        <span class="stat-label">{{ t('stats.humidity_label') }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-num">3</span>
        <span class="stat-label">{{ t('stats.langs_label') }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-num">专利</span>
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
  display: flex; align-items: center; justify-content: space-between;
  padding: 80px 8%;
  background: linear-gradient(135deg, #fff0f6 0%, #fdf6f9 60%, #f0e6ff 100%);
  min-height: 560px; gap: 40px;
}

.hero-content { flex: 1; max-width: 480px; }
.hero-eyebrow { color: #d94a87; font-size: 0.95rem; font-weight: 500; letter-spacing: 2px; margin-bottom: 16px; }
.hero-title { font-size: 3.8rem; font-weight: 800; color: #1a1a1a; line-height: 1.1; margin-bottom: 20px; }
.hero-title span { color: #d94a87; }
.hero-slogan { font-size: 1.2rem; color: #666; margin-bottom: 40px; }
.hero-btns { display: flex; gap: 16px; flex-wrap: wrap; }

.btn-primary { background: #d94a87; color: #fff; padding: 14px 32px; border-radius: 50px; font-weight: 600; font-size: 1rem; transition: all 0.2s; box-shadow: 0 4px 20px rgba(217,74,135,0.3); }
.btn-primary:hover { background: #c03878; transform: translateY(-2px); }
.btn-secondary { border: 2px solid #d94a87; color: #d94a87; padding: 14px 32px; border-radius: 50px; font-weight: 600; font-size: 1rem; transition: all 0.2s; }
.btn-secondary:hover { background: #d94a87; color: #fff; }

.hero-visual { flex-shrink: 0; }
.product-showcase { position: relative; width: 360px; height: 340px; display: flex; align-items: center; justify-content: center; }
.showcase-bg { position: absolute; inset: 0; background: radial-gradient(circle at center, rgba(217,74,135,0.12) 0%, transparent 70%); border-radius: 50%; }

.product-main { display: flex; flex-direction: column; align-items: center; gap: 12px; z-index: 2; animation: floatMain 4s ease-in-out infinite; }
@keyframes floatMain { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
.product-label { text-align: center; background: rgba(255,255,255,0.9); border-radius: 20px; padding: 6px 16px; box-shadow: 0 4px 16px rgba(217,74,135,0.15); }
.product-label strong { display: block; font-size: 0.85rem; color: #1a1a1a; }
.product-label span { font-size: 0.72rem; color: #888; }

.product-secondary { position: absolute; display: flex; flex-direction: column; align-items: center; gap: 6px; z-index: 1; }
.product-secondary span { font-size: 0.75rem; color: #666; background: rgba(255,255,255,0.85); padding: 3px 10px; border-radius: 12px; }
.product-left { left: 10px; top: 50%; animation: floatLeft 5s ease-in-out infinite; }
.product-right { right: 10px; top: 50%; animation: floatRight 4.5s ease-in-out infinite; }
@keyframes floatLeft { 0%, 100% { transform: translateY(-50%); } 50% { transform: translateY(-55%); } }
@keyframes floatRight { 0%, 100% { transform: translateY(-50%); } 50% { transform: translateY(-45%); } }

.deco-flower { position: absolute; font-size: 1.4rem; animation: spinSlow 8s linear infinite; }
.deco-1 { top: 20px; left: 60px; animation-duration: 6s; }
.deco-2 { top: 30px; right: 60px; animation-direction: reverse; }
.deco-3 { bottom: 40px; left: 80px; animation-duration: 7s; }
@keyframes spinSlow { 0% { transform: rotate(0deg) scale(1); } 50% { transform: rotate(180deg) scale(1.2); } 100% { transform: rotate(360deg) scale(1); } }

.tag-badge { position: absolute; background: #fff; border-radius: 12px; padding: 6px 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.1); display: flex; flex-direction: column; align-items: center; border: 1px solid rgba(217,74,135,0.2); }
.tag-badge span { font-size: 0.9rem; font-weight: 700; color: #d94a87; }
.tag-badge small { font-size: 0.65rem; color: #888; }
.tag-1 { top: 20px; right: 20px; }
.tag-2 { bottom: 60px; right: 10px; }

/* 产品图片展示区 */
.product-gallery { padding: 80px 8%; background: #fff; }
.section-title { font-size: 2rem; font-weight: 700; text-align: center; margin-bottom: 8px; color: #1a1a1a; }
.section-sub { text-align: center; color: #888; font-size: 0.95rem; margin-bottom: 48px; }

.gallery-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.gallery-card { background: #fdf6f9; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.06); transition: transform 0.3s; }
.gallery-card:hover { transform: translateY(-6px); box-shadow: 0 12px 32px rgba(217,74,135,0.15); }
.gallery-card img { width: 100%; aspect-ratio: 1; object-fit: cover; }
.gallery-info { padding: 16px; }
.gallery-info h3 { font-size: 0.95rem; font-weight: 600; margin-bottom: 6px; color: #1a1a1a; }
.gallery-info p { font-size: 0.8rem; color: #888; line-height: 1.5; margin-bottom: 10px; }
.gallery-tags { display: flex; gap: 4px; flex-wrap: wrap; }
.gallery-tags span { background: #fce4f0; color: #d94a87; padding: 2px 8px; border-radius: 10px; font-size: 0.72rem; }

/* 功能入口 */
.features { padding: 80px 8%; }
.features-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
.feature-card { background: #fff; border-radius: 16px; padding: 36px 24px; text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,0.06); transition: all 0.3s; color: inherit; display: block; }
.feature-card:hover { transform: translateY(-8px); box-shadow: 0 12px 40px rgba(217,74,135,0.15); }
.feature-icon { font-size: 2.5rem; margin-bottom: 16px; }
.feature-card h3 { font-size: 1.1rem; font-weight: 600; margin-bottom: 10px; color: #1a1a1a; }
.feature-card p { font-size: 0.9rem; color: #888; line-height: 1.6; }

/* 数据 */
.stats { background: #d94a87; padding: 60px 8%; display: flex; justify-content: space-around; flex-wrap: wrap; gap: 32px; }
.stat-item { text-align: center; color: #fff; }
.stat-num { display: block; font-size: 2.8rem; font-weight: 800; line-height: 1; margin-bottom: 8px; }
.stat-label { font-size: 0.95rem; opacity: 0.85; }

@media (max-width: 768px) {
  .hero { flex-direction: column; padding: 48px 6%; min-height: auto; text-align: center; }
  .hero-title { font-size: 2.4rem; }
  .hero-slogan { font-size: 1rem; }
  .hero-btns { justify-content: center; }
  .product-showcase { width: 280px; height: 260px; }
  .product-gallery { padding: 48px 6%; }
  .gallery-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .features { padding: 48px 6%; }
  .features-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
  .feature-card { padding: 24px 16px; }
  .stats { padding: 40px 6%; }
  .stat-num { font-size: 2rem; }
}
</style>
