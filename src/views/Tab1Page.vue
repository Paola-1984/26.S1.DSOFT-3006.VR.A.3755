<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Primer Tab </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Test</ion-title>
        </ion-toolbar>
      </ion-header>

      <ExploreContainer name="Primer contenido test" />
       <ion-router-outlet></ion-router-outlet>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonRouterOutlet } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
</script>
