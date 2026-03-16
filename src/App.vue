<template>
  <ion-app>
    <template v-if="isSeccion">
      <BaseLayout />
    </template>
    <template v-else>
      <ion-router-outlet />
    </template>
  </ion-app>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import BaseLayout from '@/layouts/BaseLayout.vue';

const route = useRoute();

const isSeccion = computed(() => {
  return route.path.startsWith('/seccion');
});
</script>
