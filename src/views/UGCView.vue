<template>
  <div class="ugc-page">

    <div class="page-header">
      <h1>{{ t('nav.ugc') }}</h1>
      <p>分享你的妆容，赚取兰纳积分，成为CORONG美妆达人</p>
    </div>

    <!-- 积分横幅 -->
    <div class="points-banner">
      <div class="points-item">
        <span class="points-icon">📸</span>
        <div>
          <strong>上传妆容照片</strong>
          <span>+50 兰纳积分</span>
        </div>
      </div>
      <div class="points-divider"></div>
      <div class="points-item">
        <span class="points-icon">❤️</span>
        <div>
          <strong>获得点赞</strong>
          <span>+10 积分/个</span>
        </div>
      </div>
      <div class="points-divider"></div>
      <div class="points-item">
        <span class="points-icon">🎁</span>
        <div>
          <strong>积分兑换优惠</strong>
          <span>100积分 = 9折券</span>
        </div>
      </div>
      <div class="points-divider"></div>
      <div class="points-item">
        <span class="points-icon">👑</span>
        <div>
          <strong>我的积分</strong>
          <span class="my-points">{{ myPoints }} 积分</span>
        </div>
      </div>
    </div>

    <!-- 上传区域 -->
    <div class="upload-section">
      <div class="upload-box" @click="triggerUpload" @dragover.prevent @drop.prevent="onDrop">
        <div v-if="!uploadPreview" class="upload-inner">
          <div class="upload-icon">🌸</div>
          <p>点击或拖拽上传你的妆容照片</p>
          <span>支持 JPG / PNG，最大 10MB</span>
        </div>
        <img v-else :src="uploadPreview" class="upload-preview" alt="预览"/>
      </div>
      <input ref="fileInput" type="file" accept="image/*" style="display:none" @change="onFileChange"/>

      <div v-if="uploadPreview" class="upload-form">
        <input v-model="caption" class="caption-input" placeholder="描述一下你的妆容...（比如：今日清透裸妆 ✨）"/>
        <div class="tag-select">
          <span class="tag-label">妆容风格：</span>
          <button v-for="tag in styleTags" :key="tag"
            :class="['style-tag', { active: selectedTags.includes(tag) }]"
            @click="toggleTag(tag)">{{ tag }}</button>
        </div>
        <button class="submit-btn" @click="submitPost" :disabled="submitting">
          {{ submitting ? '发布中...' : '🌸 发布并获得50积分' }}
        </button>
      </div>
    </div>

    <!-- 筛选栏 -->
    <div class="filter-bar">
      <button v-for="f in filters" :key="f"
        :class="['filter-btn', { active: activeFilter === f }]"
        @click="activeFilter = f">{{ f }}</button>
    </div>

    <!-- 瀑布流 -->
    <div class="ugc-grid">
      <div v-for="post in filteredPosts" :key="post.id" class="ugc-card">
        <div class="ugc-img-wrap">
          <img :src="post.img" :alt="post.caption" class="ugc-img"/>
          <div class="ugc-overlay">
            <button class="like-btn" @click="toggleLike(post)">
              {{ post.liked ? '❤️' : '🤍' }} {{ post.likes }}
            </button>
          </div>
        </div>
        <div class="ugc-info">
          <div class="ugc-user">
            <div class="avatar" :style="{ background: post.avatarColor }">{{ post.userName[0] }}</div>
            <span>{{ post.userName }}</span>
            <span v-if="post.verified" class="verified">✓</span>
          </div>
          <p class="ugc-caption">{{ post.caption }}</p>
          <div class="ugc-tags">
            <span v-for="tag in post.tags" :key="tag" class="ugc-tag">{{ tag }}</span>
          </div>
          <div class="ugc-shade" v-if="post.shade">
            <div class="shade-dot" :style="{ background: post.shadeColor }"></div>
            <span>{{ post.shade }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 成功提示 -->
    <div v-if="showSuccess" class="success-toast">
      🎉 发布成功！获得 +50 兰纳积分！
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const fileInput = ref(null)
const uploadPreview = ref('')
const caption = ref('')
const selectedTags = ref([])
const submitting = ref(false)
const showSuccess = ref(false)
const myPoints = ref(150)
const activeFilter = ref('全部')

const styleTags = ['清透裸妆', '复古红唇', '日系软糯', '欧美大烟熏', '泰式甜美', '自然日常']
const filters = ['全部', '清透裸妆', '复古红唇', '日系软糯', '泰式甜美', '自然日常']

function triggerUpload() { fileInput.value.click() }

function onFileChange(e) {
  const file = e.target.files[0]
  if (file) uploadPreview.value = URL.createObjectURL(file)
}

function onDrop(e) {
  const file = e.dataTransfer.files[0]
  if (file) uploadPreview.value = URL.createObjectURL(file)
}

function toggleTag(tag) {
  const i = selectedTags.value.indexOf(tag)
  if (i > -1) selectedTags.value.splice(i, 1)
  else selectedTags.value.push(tag)
}

async function submitPost() {
  submitting.value = true
  await new Promise(r => setTimeout(r, 1200))

  posts.value.unshift({
    id: Date.now(),
    img: uploadPreview.value,
    userName: '我',
    avatarColor: '#d94a87',
    verified: false,
    caption: caption.value || '我的妆容分享 ✨',
    tags: selectedTags.value.length ? [...selectedTags.value] : ['自然日常'],
    likes: 0,
    liked: false,
    shade: null,
    shadeColor: null,
  })

  myPoints.value += 50
  submitting.value = false
  showSuccess.value = true
  uploadPreview.value = ''
  caption.value = ''
  selectedTags.value = []

  setTimeout(() => showSuccess.value = false, 3000)
}

function toggleLike(post) {
  if (post.liked) {
    post.likes--
    post.liked = false
  } else {
    post.likes++
    post.liked = true
    myPoints.value += 10
  }
}

const posts = ref([
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80',
    userName: 'Nattaya_BKK',
    avatarColor: '#ff8cc8',
    verified: true,
    caption: '今日清透裸妆，配合CORONG W21色号超适合东南亚肤色！',
    tags: ['清透裸妆', '自然日常'],
    likes: 234,
    liked: false,
    shade: 'W21 自然小麦',
    shadeColor: '#C8956C',
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80',
    userName: 'Malee_CM',
    avatarColor: '#a855f7',
    verified: true,
    caption: '清迈旅行妆，高温高湿照样持妆8小时！感谢CORONG✨',
    tags: ['泰式甜美', '清透裸妆'],
    likes: 189,
    liked: false,
    shade: 'N15 象牙裸',
    shadeColor: '#E8C99A',
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&q=80',
    userName: 'Sirin_TH',
    avatarColor: '#f59e0b',
    verified: false,
    caption: '复古红唇配哑光粉底，这个组合绝了🔥',
    tags: ['复古红唇'],
    likes: 312,
    liked: false,
    shade: 'D30 深邃棕',
    shadeColor: '#7B4A2D',
  },
  {
    id: 4,
    img: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&q=80',
    userName: 'Aileen_KL',
    avatarColor: '#10b981',
    verified: false,
    caption: '马来西亚的天气太热了，还好有CORONG控油散粉救命',
    tags: ['自然日常'],
    likes: 97,
    liked: false,
    shade: 'W22 蜂蜜裸色',
    shadeColor: '#B8845C',
  },
  {
    id: 5,
    img: 'https://images.unsplash.com/photo-1503236823255-94609f598e71?w=400&q=80',
    userName: 'Yuki_JP',
    avatarColor: '#3b82f6',
    verified: true,
    caption: '日系软糯妆容，奶油肌感觉超适合用象牙白色号',
    tags: ['日系软糯'],
    likes: 445,
    liked: false,
    shade: 'N10 象牙白',
    shadeColor: '#F5E6D3',
  },
  {
    id: 6,
    img: 'https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=400&q=80',
    userName: 'Priya_SG',
    avatarColor: '#ef4444',
    verified: false,
    caption: '新加坡湿热天气测评！全天持妆无问题 💕',
    tags: ['泰式甜美', '自然日常'],
    likes: 168,
    liked: false,
    shade: 'D25 深棕裸',
    shadeColor: '#A0674A',
  },
])

const filteredPosts = computed(() => {
  if (activeFilter.value === '全部') return posts.value
  return posts.value.filter(p => p.tags.includes(activeFilter.value))
})
</script>

<style scoped>
.ugc-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 48px 24px;
}

.page-header {
  text-align: center;
  margin-bottom: 36px;
}

.page-header h1 { font-size: 2.2rem; font-weight: 700; margin-bottom: 12px; }
.page-header p { color: #888; }

/* Points banner */
.points-banner {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(135deg, #d94a87, #ff8cc8);
  border-radius: 20px;
  padding: 24px 32px;
  margin-bottom: 40px;
  color: #fff;
  flex-wrap: wrap;
  gap: 16px;
}

.points-item { display: flex; align-items: center; gap: 12px; }
.points-icon { font-size: 2rem; }
.points-item div { display: flex; flex-direction: column; }
.points-item strong { font-size: 0.95rem; font-weight: 600; }
.points-item span { font-size: 0.85rem; opacity: 0.9; }
.my-points { font-size: 1.1rem !important; font-weight: 700 !important; opacity: 1 !important; }
.points-divider { width: 1px; height: 40px; background: rgba(255,255,255,0.3); }

/* Upload */
.upload-section { margin-bottom: 40px; }

.upload-box {
  border: 2px dashed #d94a87;
  border-radius: 20px;
  min-height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: #fdf0f6;
  overflow: hidden;
  transition: all 0.2s;
  margin-bottom: 16px;
}

.upload-box:hover { background: #fce4f0; }

.upload-inner { text-align: center; color: #aaa; padding: 40px; }
.upload-icon { font-size: 3rem; margin-bottom: 12px; }
.upload-inner p { color: #666; font-size: 1rem; margin-bottom: 4px; }
.upload-inner span { font-size: 0.85rem; }

.upload-preview { width: 100%; max-height: 320px; object-fit: cover; }

.upload-form { display: flex; flex-direction: column; gap: 12px; }

.caption-input {
  width: 100%;
  padding: 12px 16px;
  border: 1.5px solid #e0e0e0;
  border-radius: 12px;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s;
}

.caption-input:focus { border-color: #d94a87; }

.tag-select { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.tag-label { font-size: 0.85rem; color: #888; }

.style-tag {
  padding: 6px 14px;
  border: 1.5px solid #e0e0e0;
  border-radius: 20px;
  background: transparent;
  font-size: 0.82rem;
  cursor: pointer;
  color: #666;
  transition: all 0.2s;
}

.style-tag.active { background: #d94a87; border-color: #d94a87; color: #fff; }

.submit-btn {
  width: 100%;
  padding: 14px;
  background: #d94a87;
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.submit-btn:hover:not(:disabled) { background: #c03878; }
.submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

/* Filter */
.filter-bar {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.filter-btn {
  padding: 8px 18px;
  border: 1.5px solid #e0e0e0;
  border-radius: 20px;
  background: transparent;
  font-size: 0.88rem;
  cursor: pointer;
  color: #666;
  transition: all 0.2s;
}

.filter-btn.active { background: #d94a87; border-color: #d94a87; color: #fff; }

/* Grid */
.ugc-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.ugc-card {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  transition: transform 0.3s;
}

.ugc-card:hover { transform: translateY(-4px); }

.ugc-img-wrap { position: relative; aspect-ratio: 4/5; overflow: hidden; }

.ugc-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
.ugc-card:hover .ugc-img { transform: scale(1.05); }

.ugc-overlay {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  padding: 12px;
  background: linear-gradient(transparent, rgba(0,0,0,0.4));
  display: flex;
  justify-content: flex-end;
}

.like-btn {
  background: rgba(255,255,255,0.9);
  border: none;
  border-radius: 20px;
  padding: 6px 12px;
  font-size: 0.85rem;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.like-btn:hover { background: #fff; transform: scale(1.1); }

.ugc-info { padding: 16px; }

.ugc-user {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.avatar {
  width: 28px; height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 0.8rem;
  font-weight: 700;
}

.ugc-user span { font-size: 0.88rem; font-weight: 600; }
.verified { color: #d94a87; font-size: 0.75rem; }

.ugc-caption { font-size: 0.85rem; color: #555; line-height: 1.5; margin-bottom: 8px; }

.ugc-tags { display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 8px; }

.ugc-tag {
  background: #fce4f0;
  color: #d94a87;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.75rem;
}

.ugc-shade {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  color: #888;
}

.shade-dot {
  width: 14px; height: 14px;
  border-radius: 50%;
  box-shadow: 0 1px 4px rgba(0,0,0,0.15);
}

/* Toast */
.success-toast {
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  background: #1a1a1a;
  color: #fff;
  padding: 14px 28px;
  border-radius: 50px;
  font-size: 0.95rem;
  font-weight: 500;
  z-index: 999;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from { transform: translateX(-50%) translateY(20px); opacity: 0; }
  to { transform: translateX(-50%) translateY(0); opacity: 1; }
}
</style>