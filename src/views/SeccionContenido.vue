<template>
    <ion-page>
        <ion-content class="ion-padding" v-if="!contentStore.loading">
            <div v-html="contentStore.content.contenido.contenido"></div>
            <div class="video-container" v-if="contentStore.content.contenido.youtube">
                <iframe 
                    width="560" 
                    height="315" 
                    :src="'https://www.youtube.com/embed/'+contentStore.content.contenido.youtube.replace('https://youtu.be/','')" 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerpolicy="strict-origin-when-cross-origin"
                     allowfullscreen>
                    </iframe>
            </div>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { useRoute } from 'vue-router';
import { useContentStore } from '@/stores/content';
const route = useRoute(); 
const contentStore = useContentStore();

</script>
<style scoped>
.video-container {
  position: relative;
  padding-bottom: 56.25%; /* Aspect ratio 16:9 */
  height: 0;
  overflow: hidden;
}
.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>