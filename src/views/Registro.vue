<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Registro</ion-title>
        <ion-buttons slot="end">
          <ion-button fill="solid" @click="router.push({ name:'login'})">Login</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-item lines="none">
        <ion-input
          label="Usuario"
          class="ion-margin-top"
          label-placement="floating"
          fill="outline"
          v-model="userStore.login.username"
          placeholder="Enter text"
        ></ion-input>
      </ion-item>

      <ion-item lines="none">
        <ion-input
          label="Contraseña"
          label-placement="floating"
          class="ion-margin-top"
          fill="outline"
          placeholder="Enter text"
          v-model="userStore.login.password"
          type="password"
        ></ion-input>
      </ion-item>

      <ion-item class="ion-margin-bottom" lines="none">
        <ion-button slot="end" size="default">Ingresar</ion-button>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton, IonLabel, IonButtons } from '@ionic/vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();
</script>