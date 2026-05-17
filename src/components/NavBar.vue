<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link to="/">CORONG 蔻容</router-link>
    </div>

    <div class="navbar-links">
      <router-link to="/">{{ t('nav.home') }}</router-link>
      <router-link to="/climate">{{ t('nav.climate') }}</router-link>
      <router-link to="/skin">{{ t('nav.skin') }}</router-link>
      <router-link to="/ar">{{ t('nav.ar') }}</router-link>
      <router-link to="/ugc">{{ t('nav.ugc') }}</router-link>
      <router-link to="/science">{{ t('nav.science') }}</router-link>
      
    </div>

    <div class="lang-switcher">
      <button
        v-for="lang in langs"
        :key="lang.code"
        :class="{ active: locale === lang.code }"
        @click="locale = lang.code"
      >
        {{ lang.label }}
      </button>
    </div>
  </nav>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const langs = [
  { code: 'zh', label: '中文' },
  { code: 'th', label: 'ไทย' },
  { code: 'ms', label: 'BM' },
]
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  height: 64px;
  background: #fff;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-brand a {
  font-size: 1.3rem;
  font-weight: 700;
  color: #d94a87;
  text-decoration: none;
  letter-spacing: 1px;
}

.navbar-links {
  display: flex;
  gap: 1.5rem;
}

.navbar-links a {
  color: #333;
  text-decoration: none;
  font-size: 0.95rem;
  padding: 4px 0;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}

.navbar-links a:hover,
.navbar-links a.router-link-active {
  color: #d94a87;
  border-bottom-color: #d94a87;
}

.lang-switcher {
  display: flex;
  gap: 0.4rem;
}

.lang-switcher button {
  border: 1px solid #e0e0e0;
  background: transparent;
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 0.8rem;
  cursor: pointer;
  color: #666;
  transition: all 0.2s;
}

.lang-switcher button.active {
  background: #d94a87;
  border-color: #d94a87;
  color: #fff;
}
</style>