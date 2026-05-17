import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/climate', component: () => import('../views/ClimateView.vue') },
    { path: '/skin', component: () => import('../views/SkinView.vue') },
    { path: '/ugc', component: () => import('../views/UGCView.vue') },
    { path: '/science', component: () => import('../views/ScienceView.vue') },
    { path: '/ar', component: () => import('../views/ARView.vue') },
  ]
})

export default router