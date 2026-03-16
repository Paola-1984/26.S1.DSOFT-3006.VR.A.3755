import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { useUserStore } from '@/stores/user';

const Login = () => import('@/views/Login.vue');
const Registro = () => import('@/views/Registro.vue');
const Camara = () => import('@/views/Camara.vue');
const SeccionContenidos = () => import('@/views/SeccionContenido.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/seccion/que-es-riksiri'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: '/registro',
    name: 'Registro',
    component: Registro,
    meta: { requiresAuth: false },
  },
  {
    path: '/camara',
    name: 'Camara',
    component: Camara,
    meta: { requiresAuth: true }
  },
  {
    path: '/seccion',
    meta: { requiresAuth: false },
    children: [
      {
        path: ':name',
        name: 'SeccionContenidos',
        component: SeccionContenidos,
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  const userStore = useUserStore();
  const isAuthenticated = !!userStore.token;

  if (to.meta.requiresAuth && !isAuthenticated) {
    return '/login';
  }

  if (isAuthenticated && (to.name === 'Login' || to.name === 'Registro')) {
    return '/seccion/que-es-riksiri';
  }
});

export default router;