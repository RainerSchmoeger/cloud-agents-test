import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import Poem from './components/Poem.vue'
import Terms from './views/Terms.vue'
import Feedback from './views/Feedback.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Poem },
    { path: '/terms', name: 'terms', component: Terms },
    { path: '/feedback', name: 'feedback', component: Feedback },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

createApp(App).use(router).mount('#app')
