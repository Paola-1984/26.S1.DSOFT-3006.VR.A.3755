import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';

const Tab1Page = () => import('@/views/Tab1Page.vue');
const Tab2Page = () => import('@/views/Tab2Page.vue');
const Tab3Page = () => import('@/views/Tab3Page.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/tab1'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        component: Tab1Page,
        redirect: '/tabs/tab1/content',
        children: [
          {
            path: 'content',
            component: () => import('@/views/Content.vue')
          },
          {
            path: 'otropath',
            component: () => import('@/views/OtroPath.vue')
          }
        ]
      },
      {
        path: 'tab2',
        component: Tab2Page
      },
      {
        path: 'tab3',
        component: Tab3Page
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;