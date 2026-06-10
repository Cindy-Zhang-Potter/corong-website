<template>
  <div class="science-page">

    <div class="page-header">
      <h1>{{ t('science.title') }}</h1>
      <p>{{ t('science.subtitle') }}</p>
    </div>

    <!-- 项目成就横幅 -->
    <div class="achievement-banner">
      <div class="achievement-item">
        <div class="achievement-icon">🔬</div>
        <div><strong>纳米技术专利</strong><span>已申请受理</span></div>
      </div>
      <div class="achievement-item">
        <div class="achievement-icon">💻</div>
        <div><strong>软件著作权</strong><span>已申请受理</span></div>
      </div>
      <div class="achievement-item">
        <div class="achievement-icon">🏭</div>
        <div><strong>GMP认证工厂</strong><span>泰国ANECO/KCOSMEX合作</span></div>
      </div>
      <div class="achievement-item">
        <div class="achievement-icon">🌿</div>
        <div><strong>第二批打样</strong><span>已完成</span></div>
      </div>
    </div>

    <!-- 核心成分 -->
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
              <p class="ing-origin">{{ ing.product }} · {{ ing.origin }}</p>
            </div>
            <div class="ing-expand">{{ expandedIndex === i ? '▲' : '▼' }}</div>
          </div>
          <div v-if="expandedIndex === i" class="ing-detail">
            <p>{{ ing.desc }}</p>
            <div class="ing-benefits">
              <span v-for="b in ing.benefits" :key="b" class="benefit-tag">✓ {{ b }}</span>
            </div>
            <div class="efficacy-bar">
              <span class="efficacy-label">技术成熟度</span>
              <div class="bar-track">
                <div class="bar-fill-star" :style="{ width: ing.efficacy + '%' }"></div>
              </div>
              <span class="efficacy-score">{{ Math.round(ing.efficacy / 10) }}/10</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 核心技术 -->
    <section class="tech-section">
      <h2>{{ t('science.tech_title') }}</h2>
      <div class="tech-grid">
        <div class="tech-card" v-for="tech in techList" :key="tech.title">
          <div class="tech-circle" :style="{ background: tech.color }">
            <span>{{ tech.icon }}</span>
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

    <!-- 技术指标 -->
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

    <!-- 研发故事 -->
    <section class="story-section">
      <div class="story-content">
        <div class="story-text">
          <h2>{{ t('science.story_title') }}</h2>
          <p>蔻蓉兰妆诞生于一个真实的痛点：<strong>东南亚消费者在高温高湿气候下，现有美妆产品持妆性能普遍不足。</strong></p>
          <p>泰国全年平均气温超过28°C，相对湿度80%以上，紫外线指数常达9-11。传统进口粉底液在这种气候下持妆时间严重缩短，脱妆、泛油、卡粉问题普遍。</p>
          <p>我们结合兰纳地区传统草本智慧与现代纳米材料科学，开发出三款针对东南亚气候的美妆产品，目前已完成第二批打样，与泰国GMP认证OEM工厂建立合作，规划与NANOTEC（泰国国家纳米技术中心）合作进行检测认证。</p>
          <div class="story-stats">
            <div class="s-stat"><strong>3款</strong><span>核心产品</span></div>
            <div class="s-stat"><strong>2批</strong><span>打样完成</span></div>
            <div class="s-stat"><strong>专利</strong><span>申请受理中</span></div>
          </div>
        </div>
        <div class="story-visual">
          <div class="research-card">
            <div class="research-icon">🌡️</div>
            <div class="research-data">
              <div class="r-item"><span>泰国年均气温</span><strong>>28°C</strong></div>
              <div class="r-item"><span>相对湿度</span><strong>>80%</strong></div>
              <div class="r-item"><span>年均紫外线指数</span><strong>UV 9-11</strong></div>
              <div class="r-item"><span>银锌沸石吸油倍率</span><strong>≥2.5g/g</strong></div>
              <div class="r-item highlight"><span>粉底液持妆时长（35°C+/80%+）</span><strong>≥8小时</strong></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 合作伙伴 -->
    <section class="partners-section">
      <h2>合作与认证</h2>
      <div class="partners-grid">
        <div class="partner-card">
          <div class="partner-icon">🏭</div>
          <h3>ANECO / KCOSMEX</h3>
          <p>泰国GMP认证OEM工厂，负责产品生产与打样</p>
        </div>
        <div class="partner-card">
          <div class="partner-icon">🔬</div>
          <h3>NANOTEC</h3>
          <p>泰国国家纳米技术中心，规划合作进行纳米材料检测认证</p>
        </div>
        <div class="partner-card">
          <div class="partner-icon">🛒</div>
          <h3>Shopee / TikTok Shop</h3>
          <p>东南亚主要电商平台，覆盖泰国、马来西亚等市场</p>
        </div>
        <div class="partner-card">
          <div class="partner-icon">📱</div>
          <h3>数字化运营</h3>
          <p>气象数据接入、AI肤色分析、AR试妆，打造智能美妆体验</p>
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
  {
    icon: '🔷', name: '多孔二氧化硅 + 疏水高岭土',
    product: '智能持妆粉底液', origin: '纳米材料',
    desc: '多孔二氧化硅提供高效吸油通道，疏水处理高岭土形成防水屏障，配合动态氢键交联聚合物成膜体系，在35°C+/80%+高温高湿环境下实现≥8小时稳定持妆，不脱妆、不泛油、不卡粉。',
    benefits: ['≥8小时持妆（35°C+/80%+）', '控油不干燥', '动态成膜', '适配黄黑皮4色号'],
    efficacy: 88,
  },
  {
    icon: '🌿', name: 'Lakoocha羟基白藜芦醇',
    product: '控油长效妆前乳', origin: '泰国兰纳传统草本',
    desc: 'Artocarpus Lakoocha（泰国木波罗）提取物，富含羟基白藜芦醇，抗氧化活性是普通白藜芦醇的数倍。能有效抑制底妆在高UV、高温环境下的氧化变暗，同时提供SPF30防晒保护，让妆容全天保持明亮。',
    benefits: ['防底妆氧化变暗', 'SPF30防晒', '抗氧化', '兰纳草本来源'],
    efficacy: 85,
  },
  {
    icon: '⚗️', name: '银锌沸石-余甘子三层纳米复合结构',
    product: '兰纳定妆散粉', origin: '纳米技术',
    desc: '核心专利技术：以银锌沸石为内核（吸油倍率≥2.5g/g，远超传统滑石粉1.2g/g），包裹余甘子提取物中间层，外层疏水性二氧化硅保护壳。在33-37°C体温范围热触发缓释，午后高温时段效果最强，持效6-8小时。',
    benefits: ['吸油≥2.5g/g', '银离子99.9%抑菌', '热响应缓释6-8h', '33-37°C触发'],
    efficacy: 92,
  },
]

const techList = [
  {
    icon: '🛡️', title: '动态氢键交联成膜', color: 'linear-gradient(135deg, #ff6b6b, #ffa07a)',
    desc: '聚合物网络通过动态氢键交联在皮肤表面形成弹性膜层，随皮肤运动自适应变形，高温下不融化、不位移。',
    stat: '≥8H', statLabel: '35°C+/80%+持妆',
  },
  {
    icon: '🌡️', title: '热响应纳米缓释', color: 'linear-gradient(135deg, #f7971e, #ffd200)',
    desc: '银锌沸石-余甘子复合结构在33-37°C范围热触发释放活性成分，随环境温度升高自动增强控油效果。',
    stat: '33-37°C', statLabel: '热响应触发温度',
  },
  {
    icon: '🌿', title: '兰纳草本抗氧化', color: 'linear-gradient(135deg, #56ab2f, #a8e063)',
    desc: 'Lakoocha羟基白藜芦醇有效对抗高UV环境下的氧化应激，防止底妆变暗，兼具SPF30防晒功效。',
    stat: 'SPF30', statLabel: 'Lakoocha提取',
  },
  {
    icon: '🎨', title: '东南亚肤色适配', color: 'linear-gradient(135deg, #d94a87, #ff8cc8)',
    desc: '针对东南亚黄皮、黑皮用户研发首期4个色号（W01-W04），从瓷白到小麦色全覆盖，不灰暗不不自然。',
    stat: '4色号', statLabel: 'W01-W04首期',
  },
]

const testData = [
  { value: '≥8H', label: '粉底液持妆', percent: 80, color: '#d94a87', desc: '35°C+/80%+湿度环境实测' },
  { value: '≥2.5', label: '散粉吸油倍率(g/g)', percent: 85, color: '#f59e0b', desc: '远超传统滑石粉1.2g/g' },
  { value: '99.9%', label: '银离子抑菌率', percent: 99, color: '#10b981', desc: '银锌沸石银离子释放' },
  { value: '6-8H', label: '散粉缓释持效', percent: 75, color: '#3b82f6', desc: '热响应三层纳米结构预估' },
]
</script>

<style scoped>
.science-page { max-width: 1100px; margin: 0 auto; padding: 48px 24px; }
.page-header { text-align: center; margin-bottom: 40px; }
.page-header h1 { font-size: 2.2rem; font-weight: 700; margin-bottom: 12px; }
.page-header p { color: #888; max-width: 600px; margin: 0 auto; line-height: 1.6; }

.achievement-banner { display: flex; justify-content: space-around; flex-wrap: wrap; gap: 16px; background: #1a1a1a; border-radius: 20px; padding: 28px 32px; margin-bottom: 64px; }
.achievement-item { display: flex; align-items: center; gap: 12px; color: #fff; }
.achievement-icon { font-size: 2rem; }
.achievement-item div { display: flex; flex-direction: column; }
.achievement-item strong { font-size: 0.95rem; font-weight: 600; }
.achievement-item span { font-size: 0.82rem; opacity: 0.6; margin-top: 2px; }

.ingredients-section { margin-bottom: 64px; }
.ingredients-section h2, .tech-section h2, .test-section h2, .story-section h2, .partners-section h2 { font-size: 1.8rem; font-weight: 700; margin-bottom: 8px; }
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
.tech-stat strong { display: block; font-size: 1.3rem; color: #d94a87; font-weight: 700; }
.tech-stat span { font-size: 0.78rem; color: #aaa; }

.test-section { margin-bottom: 64px; }
.test-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 32px; }
.test-card { background: #fff; border-radius: 16px; padding: 24px; box-shadow: 0 4px 16px rgba(0,0,0,0.06); text-align: center; }
.test-num { font-size: 2rem; font-weight: 800; margin-bottom: 4px; }
.test-label { font-size: 0.9rem; font-weight: 600; margin-bottom: 12px; color: #1a1a1a; }
.test-bar { height: 6px; background: #f0f0f0; border-radius: 3px; margin-bottom: 10px; overflow: hidden; }
.test-fill { height: 100%; border-radius: 3px; transition: width 1s ease; }
.test-desc { font-size: 0.78rem; color: #aaa; }

.story-section { margin-bottom: 64px; }
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

.partners-section { margin-bottom: 32px; }
.partners-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 32px; }
.partner-card { background: #fff; border-radius: 16px; padding: 24px 20px; text-align: center; box-shadow: 0 4px 16px rgba(0,0,0,0.06); }
.partner-icon { font-size: 2.5rem; margin-bottom: 12px; }
.partner-card h3 { font-size: 0.95rem; font-weight: 600; margin-bottom: 8px; color: #1a1a1a; }
.partner-card p { font-size: 0.82rem; color: #888; line-height: 1.5; }

@media (max-width: 768px) {
  .science-page { padding: 24px 16px; }
  .page-header h1 { font-size: 1.6rem; }
  .achievement-banner { padding: 20px 16px; gap: 16px; }
  .tech-grid, .test-grid, .partners-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
  .story-content { grid-template-columns: 1fr; gap: 32px; }
  .story-stats { gap: 16px; }
}
</style>
