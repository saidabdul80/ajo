import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  // Root route redirects to Home
  {
    path: '/',
    redirect: '/home'
  },
  
  // Dynamic folder route
  {
    path: '/folder/:id',
    name: 'Folder',
    component: () => import('@/views/Template.vue'),
  },
  
  // Home route with child routes
  {
    path: '/home',
    component: () => import('@/views/IndexPage.vue'),
    children: [
      {
        path: 'template',
        name: 'Template',
        component: () => import('@/views/Template.vue')
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
