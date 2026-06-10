<template>
  <div id="app">
    <NavBar />
    <main>
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
    <FooterComp />
    <Transition name="fade">
      <button v-if="showBackTop" class="back-top" @click="scrollToTop">↑</button>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import NavBar from './components/NavBar.vue'
import FooterComp from './components/FooterComp.vue'

const showBackTop = ref(false)
function onScroll() { showBackTop.value = window.scrollY > 400 }
function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }) }
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'PingFang SC', 'Helvetica Neue', Arial, sans-serif; background: #fdf6f9; color: #333; }
main { min-height: calc(100vh - 64px); }
a { text-decoration: none; }

.page-enter-active, .page-leave-active { transition: all 0.25s ease; }
.page-enter-from { opacity: 0; transform: translateY(12px); }
.page-leave-to { opacity: 0; transform: translateY(-12px); }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.back-top {
  position: fixed; bottom: 32px; right: 32px;
  width: 44px; height: 44px;
  background: #d94a87; color: #fff;
  border: none; border-radius: 50%;
  font-size: 1.2rem; cursor: pointer;
  box-shadow: 0 4px 16px rgba(217,74,135,0.4);
  transition: all 0.2s; z-index: 90;
  display: flex; align-items: center; justify-content: center;
}
.back-top:hover { background: #c03878; transform: translateY(-3px); }

@media (max-width: 768px) {
  .back-top { bottom: 20px; right: 20px; width: 40px; height: 40px; }
}
</style>
