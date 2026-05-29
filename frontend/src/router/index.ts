import { createRouter, createWebHistory } from 'vue-router';

// Simple check for MVP token
const isAuthenticated = () => !!localStorage.getItem('token');

const routes = [
  { path: '/', redirect: '/dashboard' },
  {
    path: '/login',
    component: () => import('../pages/Login.vue'),
    beforeEnter: (_to: any, _from: any, next: any) => {
      if (isAuthenticated()) next('/dashboard');
      else next();
    }
  },
  {
    path: '/dashboard',
    component: () => import('../pages/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/editor/:id?',
    component: () => import('../pages/Editor.vue'),
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to: any, _from: any, next: any) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/login');
  } else {
    next();
  }
});

export default router;
