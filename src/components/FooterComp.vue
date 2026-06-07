<template>
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <img src="@/assets/logos/logo-icon.svg" class="footer-logo" alt="CORONG"/>
        <div>
          <div class="footer-name">CORONG <span>蔻容</span></div>
          <p class="footer-tagline">{{ t('footer.tagline') }}</p>
        </div>
      </div>

      <div class="footer-links">
        <h4>{{ t('footer.links_title') }}</h4>
        <router-link to="/">{{ t('nav.home') }}</router-link>
        <router-link to="/climate">{{ t('nav.climate') }}</router-link>
        <router-link to="/skin">{{ t('nav.skin') }}</router-link>
        <router-link to="/ar">{{ t('nav.ar') }}</router-link>
        <router-link to="/ugc">{{ t('nav.ugc') }}</router-link>
        <router-link to="/science">{{ t('nav.science') }}</router-link>
      </div>

      <div class="footer-social">
        <h4>{{ t('footer.social_title') }}</h4>
        <a href="https://tiktok.com" target="_blank">TikTok</a>
        <a href="https://shopee.co.th" target="_blank">Shopee TH</a>
        <a href="https://shopee.com.my" target="_blank">Shopee MY</a>
        <a href="https://instagram.com" target="_blank">Instagram</a>
      </div>

      <div class="footer-contact">
        <h4>{{ t('footer.contact_title') }}</h4>
        <p>hello@corong.beauty</p>
        <p>Chiang Mai, Thailand</p>
        <p>{{ t('footer.made') }}</p>
      </div>
    </div>

    <div class="footer-bottom">
      <span>{{ t('footer.rights') }}</span>
      <div class="footer-badges">
        <span class="badge">🏆 Geneva Gold</span>
        <span class="badge">🌿 Natural</span>
        <span class="badge">✅ Dermatologist Tested</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<style scoped>
.footer {
  background: #1a1a1a;
  color: #fff;
  padding: 64px 8% 0;
  margin-top: 80px;
}

.footer-inner {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 48px;
  padding-bottom: 48px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

.footer-brand { display: flex; gap: 16px; align-items: flex-start; }

.footer-logo {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
}

.footer-name {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 8px;
  letter-spacing: 1px;
}

.footer-name span { color: #d94a87; }

.footer-tagline {
  font-size: 0.85rem;
  opacity: 0.5;
  line-height: 1.6;
  max-width: 220px;
}

.footer-links h4,
.footer-social h4,
.footer-contact h4 {
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 2px;
  opacity: 0.4;
  margin-bottom: 16px;
  text-transform: uppercase;
}

.footer-links a,
.footer-social a {
  display: block;
  color: rgba(255,255,255,0.7);
  font-size: 0.9rem;
  margin-bottom: 10px;
  transition: color 0.2s;
}

.footer-links a:hover,
.footer-social a:hover { color: #d94a87; }

.footer-contact p {
  font-size: 0.9rem;
  color: rgba(255,255,255,0.7);
  margin-bottom: 8px;
  line-height: 1.5;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  font-size: 0.8rem;
  opacity: 0.4;
  flex-wrap: wrap;
  gap: 12px;
}

.footer-badges { display: flex; gap: 12px; flex-wrap: wrap; }

.badge {
  background: rgba(255,255,255,0.08);
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
}

@media (max-width: 768px) {
  .footer { padding: 48px 6% 0; margin-top: 48px; }

  .footer-inner {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }

  .footer-brand { grid-column: 1 / -1; }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
}
</style>
