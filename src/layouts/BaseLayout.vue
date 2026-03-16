<template>
    <div class="app-layout">

        <!-- SIDEBAR -->
        <div class="sidebar" :class="{ collapsed: sidebarCollapsed }">

            <div class="sidebar-header">
                <span class="sidebar-title" v-if="!sidebarCollapsed">Riksiri</span>
            </div>

            <!-- Menú expandido -->
            <nav class="sidebar-nav" v-if="contentStore.menu && !sidebarCollapsed">
                <div v-for="(menu, key) in contentStore.menu" :key="key" class="nav-group">
                    <div class="nav-group-header" @click="toggleGroup(key)">
                        <i :class="menu.icon"></i>
                        <span>{{ menu.name }}</span>
                        <span class="arrow" :class="{ open: openGroups[key] }">‹</span>
                    </div>
                    <div class="nav-group-items" v-if="openGroups[key]">
                        <template v-for="(item, itemKey) in menu.sub" :key="itemKey">
                            <div
                                v-if="item.active === 'yes'"
                                class="nav-item"
                                :class="{ active: route.params.name === item.internal_name }"
                                @click="navigateTo(item)"
                            >
                                {{ item.name }}
                            </div>
                        </template>
                    </div>
                </div>
            </nav>

            <!-- Solo íconos cuando colapsado -->
            <nav class="sidebar-nav-icons" v-if="contentStore.menu && sidebarCollapsed">
                <div
                    v-for="(menu, key) in contentStore.menu"
                    :key="key"
                    class="nav-icon"
                    @click="sidebarCollapsed = false"
                >
                    <i :class="menu.icon"></i>
                </div>
            </nav>

            <div class="sidebar-footer" v-if="!sidebarCollapsed">
                <button class="btn-camara" @click="router.push({ name: 'Camara'})">
                    📷 Cámara
                </button>
            </div>
        </div>

        <!-- COLUMNA DERECHA -->
        <div class="main-content">

            <!-- HEADER SUPERIOR -->
            <div class="top-header">
                <button class="btn-three-dots" @click="sidebarCollapsed = !sidebarCollapsed">⋮</button>
                <div class="header-spacer"></div>
                <div class="header-user" v-if="userStore.userData">
                    <div class="user-dropdown" @click="showUserMenu = !showUserMenu">
                        <img src="https://ionicframework.com/docs/img/demos/avatar.svg" class="header-avatar" />
                        <span class="header-username">{{ userStore.userData?.usuario }}</span>
                        <span class="dropdown-arrow">▾</span>
                    </div>
                    <div class="user-menu" v-if="showUserMenu">
                        <div class="user-menu-name">{{ userStore.userData?.usuario }}</div>
                        <div class="user-menu-divider"></div>
                        <div class="user-menu-item" @click="handleLogout">Salir</div>
                    </div>
                </div>
            </div>

            <!-- CONTENIDO -->
            <div class="router-content">
                <router-view v-slot="{ Component, route: currentRoute }">
                    <component :is="Component" :key="currentRoute.path" />
                </router-view>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { useContentStore } from '@/stores/content';
import { useRouter, useRoute } from 'vue-router';

const contentStore = useContentStore();
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const sidebarCollapsed = ref(false);
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
* {
    box-sizing: border-box;
}

.app-layout {
    display: flex;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
}

/* ── SIDEBAR ── */
.sidebar {
    width: 260px;
    min-width: 260px;
    max-width: 260px;
    background-color: #1a1f2e;
    color: #fff;
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    transition: width 0.3s ease, min-width 0.3s ease, max-width 0.3s ease;
    position: relative;
    z-index: 100;
    flex-shrink: 0;
}

.sidebar.collapsed {
    width: 56px;
    min-width: 56px;
    max-width: 56px;
}

.sidebar-header {
    display: flex;
    align-items: center;
    padding: 0 16px;
    height: 56px;
    min-height: 56px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    overflow: hidden;
}

.sidebar-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: #fff;
    white-space: nowrap;
}

.sidebar-nav {
    flex: 1;
    padding: 8px 0;
    overflow-y: auto;
    overflow-x: hidden;
}

.nav-group-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    cursor: pointer;
    font-size: 0.95rem;
    font-weight: 600;
    color: #e0e0e0;
    transition: background 0.2s;
    white-space: nowrap;
}

.nav-group-header:hover { background: rgba(255,255,255,0.05); }

.arrow {
    margin-left: auto;
    font-size: 1.1rem;
    transition: transform 0.25s;
    transform: rotate(-90deg);
}

.arrow.open { transform: rotate(90deg); }

.nav-group-items { background: rgba(0,0,0,0.2); }

.nav-item {
    padding: 10px 16px 10px 32px;
    font-size: 0.88rem;
    color: #aaa;
    cursor: pointer;
    transition: all 0.2s;
    border-left: 3px solid transparent;
}

.nav-item:hover {
    color: #fff;
    background: rgba(255,255,255,0.05);
}

.nav-item.active {
    color: #fff;
    border-left-color: #7c4dff;
    background: rgba(124,77,255,0.15);
}

.sidebar-nav-icons {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px 0;
    gap: 8px;
}

.nav-icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #aaa;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.1rem;
    transition: all 0.2s;
}

.nav-icon:hover {
    background: rgba(255,255,255,0.08);
    color: #fff;
}

.sidebar-footer {
    padding: 16px;
    border-top: 1px solid rgba(255,255,255,0.1);
}

.btn-camara {
    width: 100%;
    background: #7c4dff;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 10px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
}

.btn-camara:hover { background: #6c3fd6; }

/* ── COLUMNA DERECHA ── */
.main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: #f5f5f5;
    min-width: 0;
    position: relative;
    z-index: 50;
}

.top-header {
    display: flex;
    align-items: center;
    padding: 0 16px;
    height: 56px;
    min-height: 56px;
    max-height: 56px;
    background: #fff;
    border-bottom: 1px solid #eee;
    box-shadow: 0 1px 3px rgba(0,0,0,0.06);
    flex-shrink: 0;
    position: relative;
    z-index: 999;
    width: 100%;
}

.btn-three-dots {
    background: none;
    border: 1px solid #ddd;
    border-radius: 6px;
    width: 36px;
    height: 36px;
    font-size: 1.3rem;
    cursor: pointer;
    color: #555;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
    flex-shrink: 0;
}

.btn-three-dots:hover { background: #f0f0f0; }

.header-spacer { flex: 1; }

.header-user { position: relative; }

.user-dropdown {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    padding: 6px 12px;
    border: 1px solid #ddd;
    border-radius: 20px;
    background: #fff;
    transition: background 0.2s;
}

.user-dropdown:hover { background: #f5f5f5; }

.header-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
}

.header-username {
    font-size: 0.9rem;
    color: #333;
    font-weight: 500;
    display: block;
    white-space: nowrap;
}

.dropdown-arrow {
    font-size: 0.7rem;
    color: #888;
}

.user-menu {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    background: #fff;
    border: 1px solid #eee;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    min-width: 150px;
    z-index: 200;
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
    margin: 4px 0;
}

.user-menu-item {
    padding: 12px 16px;
    font-size: 0.9rem;
    color: #333;
    cursor: pointer;
    transition: background 0.2s;
    border-radius: 8px;
}

.user-menu-item:hover { background: #f5f5f5; }

/* ── CONTENIDO ── */
.router-content {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    min-width: 0;
    position: relative;
    z-index: 1;
}
</style>