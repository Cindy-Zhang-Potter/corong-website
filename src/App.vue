<template>
  <div id="app">
    <NavBar />
    <main>
      <RouterView />
    </main>
    <FooterComp />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import FooterComp from './components/FooterComp.vue'
</script>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
  background: #fdf6f9;
  color: #333;
}

main { min-height: calc(100vh - 64px); }
a { text-decoration: none; }
</style>
