<template>
  <nav class="navbar">
    <div class="navbar-brand">
  <router-link to="/" class="navbar-brand-wrap">
    <img src="@/assets/logos/logo-icon.svg" class="navbar-flower"/>
    <span class="brand-text">CORONG <em>蔻容</em></span>
  </router-link>
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

@media (max-width: 768px) {
  .navbar {
    flex-wrap: wrap;
    height: auto;
    padding: 12px 16px;
    gap: 8px;
  }

  .navbar-brand a {
    font-size: 1.1rem;
  }

  .navbar-links {
    order: 3;
    width: 100%;
    overflow-x: auto;
    gap: 0;
    padding-bottom: 4px;
  }

  .navbar-links a {
    font-size: 0.82rem;
    padding: 6px 10px;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .lang-switcher {
    margin-left: auto;
  }

  .lang-switcher button {
    padding: 4px 8px;
    font-size: 0.75rem;
  }
}

.navbar-logo {
  height: 44px;
  width: auto;
}

.navbar-brand-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.navbar-flower {
  height: 40px;
  width: 40px;
}

.brand-text {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1a1a1a;
  letter-spacing: 1px;
}

.brand-text em {
  color: #d94a87;
  font-style: normal;
}
</style>