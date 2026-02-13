import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import BaseLayout from '@/layouts/BaseLayout.vue';

const Login = () => import('@/views/Loginn.vue');
const Registro = () => import('@/views/Registro.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/seccion'
  },
{
  path: '/login',
  name: 'Login',
  component: Login,
  meta:{ 
    requiresAuth: false
  },
},
{
  path: '/registro',
  name: 'Registro',
  component: Registro,
  meta:{ 
    requiresAuth: false
  },
},
  {
    path: '/seccion',
    component: BaseLayout,
    meta:{ 
      requiresAuth: true
    },
  },
  
  ]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth && !localStorage.getItem('token')) {
    next('/login');
  } else {
    next();
  }
});
export default router;