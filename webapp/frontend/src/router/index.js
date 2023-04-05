import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',

    children: [
      {
        path: '/results',
        name: 'Results',
        component: () => import('@/views/Results.vue'),
      },
      {
        path: '/results/:filter',
        name: 'ResultsSearch',
        component: () => import('@/views/Results.vue'),
      },
      {
        path: '/favorites',
        name: 'Favorites',
        component: () => import('@/views/Results.vue'),
      },
      {
        path: '/items/:id',
        name: 'Items',
        component: () => import('@/views/Item.vue'),
      },
    ],
  },
]

const router = createRouter({
  //history: createWebHashHistory(process.env.BASE_URL),
  history: createWebHistory('/colorsfront/'),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

export default router
