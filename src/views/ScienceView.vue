<template>
  <div class="science-page">

    <div class="page-header">
      <h1>{{ t('science.title') }}</h1>
      <p>{{ t('science.subtitle') }}</p>
    </div>

    <div class="achievement-banner">
      <div class="achievement-item">
        <div class="achievement-icon">🏆</div>
        <div><strong>日内瓦国际发明展</strong><span>金奖得主</span></div>
      </div>
      <div class="achievement-item">
        <div class="achievement-icon">🔬</div>
        <div><strong>3年研发周期</strong><span>东南亚气候专项研究</span></div>
      </div>
      <div class="achievement-item">
        <div class="achievement-icon">🌿</div>
        <div><strong>天然成分</strong><span>兰纳花卉提取物</span></div>
      </div>
      <div class="achievement-item">
        <div class="achievement-icon">✅</div>
        <div><strong>皮肤科测试</strong><span>敏感肌适用认证</span></div>
      </div>
    </div>

    <section class="ingredients-section">
      <h2>{{ t('science.ingredients_title') }}</h2>
      <p class="section-sub">{{ t('science.ingredients_sub') }}</p>
      <div class="ingredients-grid">
        <div v-for="(ing, i) in ingredients" :key="ing.name"
          class="ingredient-card"
          :class="{ expanded: expandedIndex === i }"
          @click="expandedIndex = expandedIndex === i ? -1 : i">
          <div class="ing-header">
            <div class="ing-icon">{{ ing.icon }}</div>
            <div class="ing-info">
              <h3>{{ ing.name }}</h3>
              <p class="ing-origin">{{ ing.origin }}</p>
            </div>
            <div class="ing-expand">{{ expandedIndex === i ? '▲' : '▼' }}</div>
          </div>
          <div v-if="expandedIndex === i" class="ing-detail">
            <p>{{ ing.desc }}</p>
            <div class="ing-benefits">
              <span v-for="b in ing.benefits" :key="b" class="benefit-tag">✓ {{ b }}</span>
            </div>
            <div class="efficacy-bar">
              <span class="efficacy-label">功效评级</span>
              <div class="bar-track">
                <div class="bar-fill-star" :style="{ width: ing.efficacy + '%' }"></div>
              </div>
              <span class="efficacy-score">{{ Math.round(ing.efficacy / 10) }}/10</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="tech-section">
      <h2>{{ t('science.tech_title') }}</h2>
      <div class="tech-grid">
        <div class="tech-card" v-for="tech in techList" :key="tech.title">
          <div class="tech-visual">
            <div class="tech-circle" :style="{ background: tech.color }">
              <span>{{ tech.icon }}</span>
            </div>
          </div>
          <h3>{{ tech.title }}</h3>
          <p>{{ tech.desc }}</p>
          <div class="tech-stat">
            <strong>{{ tech.stat }}</strong>
            <span>{{ tech.statLabel }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="test-section">
      <h2>{{ t('science.test_title') }}</h2>
      <div class="test-grid">
        <div v-for="test in testData" :key="test.label" class="test-card">
          <div class="test-num" :style="{ color: test.color }">{{ test.value }}</div>
          <div class="test-label">{{ test.label }}</div>
          <div class="test-bar">
            <div class="test-fill" :style="{ width: test.percent + '%', background: test.color }"></div>
          </div>
          <div class="test-desc">{{ test.desc }}</div>
        </div>
      </div>
    </section>

    <section class="story-section">
      <div class="story-content">
        <div class="story-text">
          <h2>{{ t('science.story_title') }}</h2>
          <p>CORONG诞生于一个简单的问题：<strong>为什么西方的美妆配方在东南亚总是"水土不服"？</strong></p>
          <p>泰国全年平均气温超过28°C，相对湿度高达80%以上。这种极端气候条件让大多数进口粉底在2-3小时内就会脱妆、泛油、卡粉。</p>
          <p>我们的团队在清迈、曼谷、普吉岛进行了长达3年的实地测试，采集了超过2000份肤色数据，最终研发出专为东南亚气候优化的配方体系——这就是CORONG蔻容的诞生。</p>
          <div class="story-stats">
            <div class="s-stat"><strong>2000+</strong><span>肤色数据样本</span></div>
            <div class="s-stat"><strong>3年</strong><span>实地研发周期</span></div>
            <div class="s-stat"><strong>3城市</strong><span>泰国实测地点</span></div>
          </div>
        </div>
        <div class="story-visual">
          <div class="research-card">
            <div class="research-icon">🌡️</div>
            <div class="research-data">
              <div class="r-item"><span>曼谷平均气温</span><strong>32°C</strong></div>
              <div class="r-item"><span>平均相对湿度</span><strong>82%</strong></div>
              <div class="r-item"><span>年均紫外线指数</span><strong>UV 9</strong></div>
              <div class="r-item"><span>传统粉底持妆时长</span><strong>2-3小时</strong></div>
              <div class="r-item highlight"><span>CORONG持妆时长</span><strong>12小时</strong></div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const expandedIndex = ref(-1)

const ingredients = [
  { icon: '🌸', name: '兰纳莲花提取物', origin: '产自泰国清迈，海拔1200米高地', desc: '兰纳地区特有的高山莲花，富含天然多糖和黄酮类物质，具有极强的锁水保湿能力。在东南亚高温高湿环境下能形成透气防护膜，阻止皮脂过度分泌。', benefits: ['12小时控油', '补水保湿', '抗氧化', '舒缓敏感'], efficacy: 92 },
  { icon: '🔷', name: '微孔硅石复合体', origin: '实验室合成，专利配方', desc: '纳米级多孔硅石颗粒，能吸附相当自身重量数倍的油脂，同时保持粉体的轻盈感。这是CORONG持妆技术的核心——在吸油的同时不产生干燥感。', benefits: ['超强吸油', '轻薄感', '不致痘', '透气性强'], efficacy: 88 },
  { icon: '🌿', name: '姜黄素衍生物', origin: '泰国传统草本，现代提纯工艺', desc: '源自泰国传统医学的姜黄，经过现代提纯去除了染色成分，保留了强效的抗炎和抗氧化活性。能有效对抗紫外线造成的氧化损伤，延缓肌肤老化。', benefits: ['抗氧化', '抗炎', '均匀肤色', '抗UV损伤'], efficacy: 85 },
  { icon: '💧', name: '热带海洋胶原肽', origin: '泰国湾深海鱼类提取', desc: '低分子量胶原肽，分子量约300Da，可渗透角质层补充真皮胶原蛋白。与高温气候下加速流失的胶原形成互补，长期使用改善肌肤弹性。', benefits: ['补充胶原', '紧致肌肤', '改善弹性', '长效保湿'], efficacy: 80 },
]

const techList = [
  { icon: '🛡️', title: '热稳定成膜技术', desc: '独特的聚合物网络在38°C高温下依然保持结构稳定，不融化、不位移，是持妆的核心技术壁垒。', stat: '38°C', statLabel: '热稳定上限', color: 'linear-gradient(135deg, #ff6b6b, #ffa07a)' },
  { icon: '💧', title: '湿度自适应控油', desc: '成膜剂能感知环境湿度变化，湿度越高控油效果越强，在泰国雨季表现尤为突出。', stat: '90%', statLabel: '湿度耐受上限', color: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
  { icon: '☀️', title: 'UV光稳定防护', desc: '内置有机UV吸收剂与无机钛白粉双重防护，在UV指数高达11的极端条件下也能有效保护肌肤。', stat: 'UV 11', statLabel: '最高防护指数', color: 'linear-gradient(135deg, #f7971e, #ffd200)' },
  { icon: '🌈', title: '东南亚肤色适配', desc: '针对象牙白到深邃棕6大肤色类型独立调色，确保每种肤色都能找到完美匹配，不出现灰暗或不自然感。', stat: '6', statLabel: '专属色号系列', color: 'linear-gradient(135deg, #d94a87, #ff8cc8)' },
]

const testData = [
  { value: '12h', label: '持妆时长', percent: 85, color: '#d94a87', desc: '在38°C/80%湿度环境下实测' },
  { value: '98%', label: '控油有效率', percent: 98, color: '#f59e0b', desc: '200名测试者使用后反馈' },
  { value: 'SPF50', label: '防晒指数', percent: 90, color: '#10b981', desc: '经SGS实验室认证' },
  { value: '97%', label: '敏感肌适用', percent: 97, color: '#3b82f6', desc: '皮肤科医生测试认可' },
]
</script>

<style scoped>
.science-page { max-width: 1100px; margin: 0 auto; padding: 48px 24px; }
.page-header { text-align: center; margin-bottom: 40px; }
.page-header h1 { font-size: 2.2rem; font-weight: 700; margin-bottom: 12px; }
.page-header p { color: #888; }

.achievement-banner { display: flex; justify-content: space-around; flex-wrap: wrap; gap: 16px; background: #1a1a1a; border-radius: 20px; padding: 28px 32px; margin-bottom: 64px; }
.achievement-item { display: flex; align-items: center; gap: 12px; color: #fff; }
.achievement-icon { font-size: 2rem; }
.achievement-item div { display: flex; flex-direction: column; }
.achievement-item strong { font-size: 0.95rem; font-weight: 600; }
.achievement-item span { font-size: 0.82rem; opacity: 0.6; margin-top: 2px; }

.ingredients-section { margin-bottom: 64px; }
.ingredients-section h2, .tech-section h2, .test-section h2, .story-section h2 { font-size: 1.8rem; font-weight: 700; margin-bottom: 8px; }
.section-sub { color: #888; margin-bottom: 32px; }
.ingredients-grid { display: flex; flex-direction: column; gap: 12px; }
.ingredient-card { background: #fff; border-radius: 16px; padding: 20px 24px; box-shadow: 0 4px 16px rgba(0,0,0,0.05); cursor: pointer; transition: all 0.3s; }
.ingredient-card:hover { box-shadow: 0 8px 24px rgba(217,74,135,0.12); }
.ingredient-card.expanded { border: 1.5px solid #d94a87; }
.ing-header { display: flex; align-items: center; gap: 16px; }
.ing-icon { font-size: 2rem; }
.ing-info { flex: 1; }
.ing-info h3 { font-size: 1rem; font-weight: 600; margin-bottom: 4px; }
.ing-origin { font-size: 0.82rem; color: #888; }
.ing-expand { color: #d94a87; font-size: 0.8rem; }
.ing-detail { margin-top: 16px; padding-top: 16px; border-top: 1px solid #f0f0f0; }
.ing-detail p { font-size: 0.9rem; color: #555; line-height: 1.7; margin-bottom: 16px; }
.ing-benefits { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; }
.benefit-tag { background: #fce4f0; color: #d94a87; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; }
.efficacy-bar { display: flex; align-items: center; gap: 12px; }
.efficacy-label { font-size: 0.8rem; color: #888; white-space: nowrap; }
.bar-track { flex: 1; height: 6px; background: #f0f0f0; border-radius: 3px; overflow: hidden; }
.bar-fill-star { height: 100%; background: linear-gradient(90deg, #d94a87, #ff8cc8); border-radius: 3px; transition: width 0.8s ease; }
.efficacy-score { font-size: 0.85rem; font-weight: 600; color: #d94a87; white-space: nowrap; }

.tech-section { margin-bottom: 64px; }
.tech-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 32px; }
.tech-card { background: #fff; border-radius: 16px; padding: 28px 20px; text-align: center; box-shadow: 0 4px 16px rgba(0,0,0,0.06); transition: transform 0.3s; }
.tech-card:hover { transform: translateY(-4px); }
.tech-circle { width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; margin: 0 auto 16px; }
.tech-card h3 { font-size: 0.95rem; font-weight: 600; margin-bottom: 10px; }
.tech-card p { font-size: 0.82rem; color: #888; line-height: 1.6; margin-bottom: 16px; }
.tech-stat { border-top: 1px solid #f0f0f0; padding-top: 12px; }
.tech-stat strong { display: block; font-size: 1.4rem; color: #d94a87; font-weight: 700; }
.tech-stat span { font-size: 0.78rem; color: #aaa; }

.test-section { margin-bottom: 64px; }
.test-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 32px; }
.test-card { background: #fff; border-radius: 16px; padding: 24px; box-shadow: 0 4px 16px rgba(0,0,0,0.06); text-align: center; }
.test-num { font-size: 2.2rem; font-weight: 800; margin-bottom: 4px; }
.test-label { font-size: 0.9rem; font-weight: 600; margin-bottom: 12px; color: #1a1a1a; }
.test-bar { height: 6px; background: #f0f0f0; border-radius: 3px; margin-bottom: 10px; overflow: hidden; }
.test-fill { height: 100%; border-radius: 3px; transition: width 1s ease; }
.test-desc { font-size: 0.78rem; color: #aaa; }

.story-section { margin-bottom: 32px; }
.story-content { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; margin-top: 32px; }
.story-text h2 { margin-bottom: 20px; }
.story-text p { font-size: 0.95rem; color: #555; line-height: 1.8; margin-bottom: 16px; }
.story-text strong { color: #d94a87; }
.story-stats { display: flex; gap: 24px; margin-top: 24px; }
.s-stat { display: flex; flex-direction: column; }
.s-stat strong { font-size: 1.6rem; font-weight: 800; color: #d94a87; }
.s-stat span { font-size: 0.8rem; color: #888; }

.research-card { background: #1a1a1a; border-radius: 20px; padding: 32px; color: #fff; }
.research-icon { font-size: 2.5rem; margin-bottom: 20px; }
.r-item { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); }
.r-item span { font-size: 0.85rem; opacity: 0.6; }
.r-item strong { font-size: 0.95rem; font-weight: 600; }
.r-item.highlight { background: rgba(217,74,135,0.2); margin: 8px -32px -32px; padding: 16px 32px; border-radius: 0 0 20px 20px; border-bottom: none; }
.r-item.highlight span { opacity: 0.9; color: #ff8cc8; }
.r-item.highlight strong { color: #ff8cc8; font-size: 1.1rem; }

@media (max-width: 768px) {
  .science-page { padding: 24px 16px; }
  .page-header h1 { font-size: 1.6rem; }
  .achievement-banner { padding: 20px 16px; gap: 16px; }
  .tech-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
  .test-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
  .story-content { grid-template-columns: 1fr; gap: 32px; }
  .story-stats { gap: 16px; }
  .ingredients-section h2, .tech-section h2, .test-section h2 { font-size: 1.4rem; }
}
</style>
