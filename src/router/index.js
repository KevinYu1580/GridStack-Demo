import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import gridStackTest from '../views/gridStackTest.vue'
// import PrimeVueTest from '../views/PrimeVueTest.vue'
// import eChartTest from '../views/eChartTest.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/gridStackTest',
      name: 'gridStackTest',

      component: () => import('../views/gridStackTest.vue')
    },
    {
      path: '/gridStackTest2',
      name: 'gridStackTest2',

      component: () => import('../views/gridStackTest2.vue')
    },
    {
      path: '/gridStackTest3',
      name: 'gridStackTest3',

      component: () => import('../views/gridStackTest3.vue')
    },
    {
      path: '/PrimeVueTest',
      name: 'PrimeVueTest',

      component: () => import('../views/PrimeVueTest.vue')
    },
    {
      path: '/eChartTest',
      name: 'eChartTest',

      component: () => import('../views/eChartTest.vue')
    }
  ]
})

export default router
