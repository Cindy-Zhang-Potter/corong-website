<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-brand-wrap">
        <img src="@/assets/logos/logo-icon.svg" class="navbar-flower" alt="KOURONG"/>
        <span class="brand-text">KOURONG <em>蔻蓉</em></span>
      </router-link>
    </div>

    <div class="navbar-links desktop-only">
      <router-link to="/">{{ t('nav.home') }}</router-link>
      <router-link to="/climate">{{ t('nav.climate') }}</router-link>
      <router-link to="/skin">{{ t('nav.skin') }}</router-link>
      <router-link to="/ar">{{ t('nav.ar') }}</router-link>
      <router-link to="/ugc">{{ t('nav.ugc') }}</router-link>
      <router-link to="/science">{{ t('nav.science') }}</router-link>
    </div>

    <div class="navbar-right">
      <div class="lang-switcher">
        <button v-for="lang in langs" :key="lang.code"
          :class="{ active: locale === lang.code }"
          @click="locale = lang.code">
          {{ lang.label }}
        </button>
      </div>
      <button class="hamburger mobile-only" @click="menuOpen = !menuOpen" :class="{ open: menuOpen }">
        <span></span><span></span><span></span>
      </button>
    </div>

    <div class="mobile-menu" :class="{ open: menuOpen }">
      <router-link to="/" @click="menuOpen = false">{{ t('nav.home') }}</router-link>
      <router-link to="/climate" @click="menuOpen = false">{{ t('nav.climate') }}</router-link>
      <router-link to="/skin" @click="menuOpen = false">{{ t('nav.skin') }}</router-link>
      <router-link to="/ar" @click="menuOpen = false">{{ t('nav.ar') }}</router-link>
      <router-link to="/ugc" @click="menuOpen = false">{{ t('nav.ugc') }}</router-link>
      <router-link to="/science" @click="menuOpen = false">{{ t('nav.science') }}</router-link>
    </div>

    <div v-if="menuOpen" class="menu-overlay" @click="menuOpen = false"></div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
const menuOpen = ref(false)
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

.navbar-brand-wrap { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.navbar-flower { height: 40px; width: 40px; }
.brand-text { font-size: 1.3rem; font-weight: 700; color: #1a1a1a; letter-spacing: 1px; }
.brand-text em { color: #d94a87; font-style: normal; }

.navbar-links { display: flex; gap: 1.5rem; }
.navbar-links a { color: #333; text-decoration: none; font-size: 0.95rem; padding: 4px 0; border-bottom: 2px solid transparent; transition: all 0.2s; }
.navbar-links a:hover, .navbar-links a.router-link-active { color: #d94a87; border-bottom-color: #d94a87; }

.navbar-right { display: flex; align-items: center; gap: 12px; }
.lang-switcher { display: flex; gap: 0.4rem; }
.lang-switcher button { border: 1px solid #e0e0e0; background: transparent; border-radius: 20px; padding: 4px 12px; font-size: 0.8rem; cursor: pointer; color: #666; transition: all 0.2s; }
.lang-switcher button.active { background: #d94a87; border-color: #d94a87; color: #fff; }

.hamburger { display: none; flex-direction: column; justify-content: space-between; width: 24px; height: 18px; background: transparent; border: none; cursor: pointer; padding: 0; }
.hamburger span { display: block; height: 2px; width: 100%; background: #1a1a1a; border-radius: 2px; transition: all 0.3s; }
.hamburger.open span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; }
.hamburger.open span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

.mobile-menu {
  display: none;
  position: fixed;
  top: 64px; left: 0; right: 0;
  background: #fff;
  padding: 16px 24px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  flex-direction: column;
  gap: 4px;
  z-index: 99;
  transform: translateY(-20px);
  opacity: 0;
  transition: all 0.3s;
  pointer-events: none;
}
.mobile-menu.open { transform: translateY(0); opacity: 1; pointer-events: all; }
.mobile-menu a { display: block; padding: 14px 16px; color: #333; text-decoration: none; font-size: 1rem; border-radius: 10px; transition: all 0.2s; }
.mobile-menu a:hover, .mobile-menu a.router-link-active { background: #fce4f0; color: #d94a87; }

.menu-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.3); z-index: 98; }

@media (max-width: 768px) {
  .navbar { padding: 0 16px; }
  .desktop-only { display: none; }
  .mobile-only { display: flex; }
  .hamburger { display: flex; }
  .mobile-menu { display: flex; }
  .lang-switcher button { padding: 4px 8px; font-size: 0.75rem; }
}
</style>
