<template>
  <ion-page>
    <ion-menu content-id="main-content" type="push">
  <ion-content class="sidebar-bg">
    <div class="sidebar-brand">
      <span class="brand-name">Riksiri</span>
      <div class="brand-icons">
        <button class="brand-icon-btn" title="Modo oscuro">
          <ion-icon :icon="moonOutline"></ion-icon>
        </button>
        <button class="brand-icon-btn" title="Marcadores">
          <ion-icon :icon="bookmarkOutline"></ion-icon>
        </button>
      </div>
    </div>
        <ion-list lines="none" class="sidebar-bg">
          <div v-for="(menu, key) in contentStore.menu" :key="key">
            <ion-item button @click="toggleGroup(key)" class="nav-group-header">
              <i :class="menu.icon" slot="start"></i>
              <ion-label>{{ menu.name }}</ion-label>
              <ion-icon 
                :icon="openGroups[key] ? chevronDown : chevronForward" 
                slot="end">
              </ion-icon>
            </ion-item>
            <div v-if="openGroups[key]">
              <ion-item 
                v-for="(item, itemKey) in menu.sub" 
                :key="itemKey"
                button 
                @click="navigateTo(item)"
                :class="{ 'nav-item-active': route.params.name === item.internal_name }"
                class="nav-sub-item"
              >
                <ion-label>{{ item.name }}</ion-label>
              </ion-item>
            </div>
          </div>
        </ion-list>
      </ion-content>

      <ion-footer class="ion-padding sidebar-bg">
        <ion-button expand="block" color="tertiary" @click="router.push({ name: 'Camara'})">
          📷 Cámara
        </ion-button>
      </ion-footer>
    </ion-menu>

    <div class="ion-page" id="main-content">
      <!-- ✅ UN SOLO ion-header, sin page-subheader -->
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-title>Riksiri</ion-title>
          <ion-buttons slot="end">
            <ion-avatar 
              @click="showUserMenu = !showUserMenu" 
              style="width: 32px; height: 32px; margin-right: 10px; cursor: pointer;">
              <img src="https://ionicframework.com/docs/img/demos/avatar.svg" />
            </ion-avatar>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <!-- Menú de usuario -->
      <div class="user-menu-overlay" v-if="showUserMenu" @click="showUserMenu = false"></div>
      <div class="user-menu-popup" v-if="showUserMenu">
        <div class="user-menu-name">{{ userStore.userData?.usuario || 'Usuario' }}</div>
        <div class="user-menu-divider"></div>
        <div class="user-menu-item" @click="handleLogout">Salir</div>
      </div>

      <ion-content>
        <router-view></router-view>
      </ion-content>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { useContentStore } from '@/stores/content';
import { useRouter, useRoute } from 'vue-router';

import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonMenu, IonButtons, IonMenuButton, IonList, IonItem, 
  IonLabel, IonIcon, IonAvatar, IonButton, IonFooter 
} from '@ionic/vue';

import { chevronDown, chevronForward, moonOutline, bookmarkOutline } from 'ionicons/icons';

const contentStore = useContentStore();
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const openGroups = ref<Record<string | number, boolean>>({ 0: true });
const showUserMenu = ref(false);

function toggleGroup(key: string | number) {
  openGroups.value[key] = !openGroups.value[key];
}

function navigateTo(item: any) {
  contentStore.$getContent(item.internal_name);
  router.push({ path: '/' + item.url });
}

async function handleLogout() {
  showUserMenu.value = false;
  await userStore.$setLogin(null);
  router.push('/login');
}

if (route.params.name) {
  contentStore.$getContent(route.params.name as string);
} else if (contentStore.home?.internal_name) {
  contentStore.$getContent(contentStore.home.internal_name);
  router.push({ path: '/' + contentStore.home.url });
}
</script>

<style scoped>
.sidebar-bg {
  --background: #1a1f2e;
  --color: #fff;
}

ion-menu {
  --background: #1a1f2e;
}

.sidebar-bg::part(scroll) {
  background: #1a1f2e;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.brand-name {
  color: #fff;
  font-size: 1.1rem;
  font-weight: 700;
}

.brand-icons {
  display: flex;
  gap: 4px;
}

.brand-icon-btn {
  background: none;
  border: none;
  color: #fff;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background 0.2s;
}

.brand-icon-btn:hover {
  background: rgba(255,255,255,0.1);
}

.nav-group-header {
  --background: #1a1f2e;
  --color: #e0e0e0;
  font-weight: 600;
}

.nav-sub-item {
  --background: #141824;
  --color: #aaa;
  --padding-start: 32px;
  font-size: 0.88rem;
}

.nav-item-active {
  --color: #fff;
  --background: rgba(124, 77, 255, 0.15);
  border-left: 3px solid #7c4dff;
}

.user-menu-overlay {
  position: fixed;
  inset: 0;
  z-index: 998;
}

.user-menu-popup {
  position: fixed;
  top: 56px;
  right: 12px;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  min-width: 150px;
  z-index: 999;
}

.user-menu-name {
  padding: 12px 16px 8px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #333;
  text-align: center;
}

.user-menu-divider {
  height: 1px;
  background: #eee;
}

.user-menu-item {
  padding: 12px 16px;
  font-size: 0.9rem;
  color: #e53935;
  cursor: pointer;
  font-weight: 500;
}

.user-menu-item:hover { background: #fff5f5; }

ion-content {
  --padding-start: 0;
  --padding-end: 0;
  --padding-top: 0;
  --padding-bottom: 0;
}
</style>