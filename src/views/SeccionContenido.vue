<template>
    <div v-if="!contentStore.loading" class="seccion-wrapper">

        <!-- Header con título y breadcrumb -->
        <div class="seccion-header">
            <h1 class="seccion-title">{{ contentStore.content?.contenido?.name }}</h1>
            <div class="breadcrumb" v-if="contentStore.content?.contenido?.name">
                <span class="breadcrumb-section">{{ currentMenuName }}</span>
                <span class="breadcrumb-sep">›</span>
                <span class="breadcrumb-current">{{ contentStore.content?.contenido?.name }}</span>
            </div>
        </div>

        <!-- Cuerpo -->
        <div class="seccion-body">
            <div class="contenido-label">CONTENIDO</div>
            <div class="contenido-html" v-html="contentStore.content?.contenido?.contenido"></div>

            <div class="video-container" v-if="contentStore.content?.contenido?.youtube">
                <iframe
                    :src="'https://www.youtube.com/embed/' + youtubeId"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen>
                </iframe>
            </div>
        </div>

        <!-- Footer botones -->
        <div class="seccion-footer">
            <button class="btn-anterior" @click="anterior()" v-if="canGoBack">
                ← Anterior
            </button>
            <div class="footer-spacer"></div>
            <button class="btn-siguiente" @click="siguiente()" v-if="contentStore.next?.url">
                Siguiente →
            </button>
        </div>

        <!-- Footer global -->
        <div class="seccion-global-footer">
            <span class="footer-brand">Riksiri 2.0 © 2026</span>
            <span class="footer-creditos">Créditos</span>
        </div>

    </div>
    <SkeletonText v-else></SkeletonText>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useContentStore } from '@/stores/content';
import SkeletonText from '@/components/SkeletonText.vue';

const route = useRoute();
const router = useRouter();
const contentStore = useContentStore();

const youtubeId = computed(() => {
    const yt = contentStore.content?.contenido?.youtube || '';
    return yt.replace('https://youtu.be/', '').replace('https://www.youtube.com/watch?v=', '');
});

const currentMenuName = computed(() => {
    if (!contentStore.menu) return '';
    for (const menu of contentStore.menu) {
        for (const sub of menu.sub) {
            if (sub.internal_name === route.params.name) return menu.name;
        }
    }
    return '';
});

const canGoBack = computed(() => {
    const firstItem = contentStore.menu?.[0]?.sub?.[0];
    return firstItem?.internal_name !== route.params.name;
});

watch(
    () => route.params.name,
    (newName) => {
        if (newName) {
            contentStore.$getContent(newName as string);
            checkNext();
        }
    },
    { immediate: true }
);

function checkNext() {
    setTimeout(() => {
        let found = false;
        contentStore.$setNext({ id: null, url: null, internal_name: '' });
        contentStore.menu?.forEach((item: any) => {
            item.sub?.forEach((sub_item: any) => {
                if (found && !contentStore.next?.url) {
                    contentStore.$setNext(sub_item);
                }
                if (sub_item.internal_name === route.params.name) {
                    found = true;
                }
            });
        });
    }, 200);
}

function setNext() {
    contentStore.menu?.forEach((item: any) => {
        item.sub?.forEach((sub_item: any) => {
            if (sub_item.id === contentStore.next?.id) {
                sub_item.active = 'yes';
                contentStore.$setHome(contentStore.next);
            }
        });
    });
    localStorage.setItem('menu', JSON.stringify(contentStore.menu));
}

async function anterior() {
    router.back();
}

async function siguiente() {
    if (contentStore.next?.url) {
        setNext();
        contentStore.$seteaSiguiente();
        router.push('/' + contentStore.next.url);
    }
}
</script>

<style scoped>
.seccion-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    width: 100%;
    background: #f0f2f5;
}

/* ── HEADER ── */
.seccion-header {
    background: #fff;
    padding: 18px 24px;
    border-bottom: 1px solid #e8e8e8;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.seccion-title {
    font-size: 1.4rem;
    font-weight: 700;
    color: #1a1f2e;
    margin: 0;
}

.breadcrumb {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.85rem;
    white-space: nowrap;
}

.breadcrumb-section {
    color: #2979ff;
    font-weight: 600;
}

.breadcrumb-sep { color: #bbb; }

.breadcrumb-current {
    color: #555;
    font-weight: 500;
}

/* ── BODY ── */
.seccion-body {
    padding: 24px;
    background: #fff;
    margin: 16px;
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.06);
    width: calc(100% - 32px);
    box-sizing: border-box;
}

.contenido-label {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    color: #999;
    text-transform: uppercase;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid #eee;
}

.contenido-html {
    font-size: 1rem;
    line-height: 1.7;
    color: #333;
    margin-bottom: 8px;
}

/* ── VIDEO ── */
.video-container {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    margin-top: 24px;
    border-radius: 8px;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
}

.video-container iframe {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    border-radius: 8px;
}

/* ── FOOTER BOTONES ── */
.seccion-footer {
    display: flex;
    align-items: center;
    padding: 16px 24px;
    background: #fff;
    border-top: 1px solid #eee;
    margin: 0 16px 16px;
    border-radius: 0 0 8px 8px;
    width: calc(100% - 32px);
    box-sizing: border-box;
}

.footer-spacer { flex: 1; }

.btn-anterior {
    background: #26a69a;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 10px 24px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
}
.btn-anterior:hover { background: #1e8a7e; }

.btn-siguiente {
    background: #7c4dff;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 10px 24px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
}
.btn-siguiente:hover { background: #6c3fd6; }

/* ── FOOTER GLOBAL ── */
.seccion-global-footer {
    display: flex;
    justify-content: space-between;
    padding: 16px 24px;
    font-size: 0.85rem;
}

.footer-brand { color: #7c4dff; font-weight: 500; }
.footer-creditos { color: #7c4dff; cursor: pointer; font-weight: 500; }
</style>