import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/categories/1',
    children: [
      {
        path: '/categories/:userId',
        name: 'Categories',
        component: () => import('@/views/Categories.vue'),
      },
      {
        path: '/results/:userId',
        name: 'Results',
        component: () => import('@/views/Results.vue'),
      },
      {
        path: '/basket',
        name: 'Basket',
        component: () => import('@/views/Basket.vue'),
      },
      {
        path: '/basket/:userId',
        name: 'BasketForId',
        component: () => import('@/views/Basket.vue'),
      },
      {
        path: '/order',
        name: 'Order',
        component: () => import('@/views/Order.vue'),
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
  /*scrollBehavior(to, from, savedPosition) {
    // console.log(to, from, savedPosition)
    // always scroll to top
    if (to.name !== 'Results' && to.name !== 'Categories') return { top: 0 }
  },*/
})

export default router
