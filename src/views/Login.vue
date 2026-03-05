<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
            
                <ion-title>Login</ion-title>
                <ion-buttons slot="end">
                    <ion-button fill="solid" @click="router.push({ name: 'Registro'})">Registrarse</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-item lines="none">                
                <ion-input 
                    label="Usuario" 
                    :disabled="loading"
                    class="ion-margin-top"
                    label-placement="floating" 
                    fill="outline" 
                    v-model="userStore.login.username"
                    placeholder="Enter text">
                </ion-input>
            </ion-item>
            <ion-item lines="none">
                <ion-input 
                    label="Contraseña" 
                    :disabled="loading"
                    label-placement="floating" 
                    class="ion-margin-top"
                    fill="outline" 
                    placeholder="Enter text" 
                    v-model="userStore.login.password"
                    @keyup.enter="handleLogin"
                    type="password">
                </ion-input>
            </ion-item>   
            <ion-item class="ion-margin-bottom" lines="none">
                <ion-button 
                    slot="end" 
                    size="default" 
                    @click="handleLogin"
                    :disabled="loading"
                    > 
                    <span v-if="!loading">Ingresar</span>
                    <ion-spinner v-if="loading" name="crescent"></ion-spinner>
                </ion-button>
            </ion-item>
        </ion-content>
    </ion-page>

</template>
<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, 
    IonTitle, IonContent, alertController, 
    IonItem, IonInput, IonButton, IonLabel, IonButtons, IonSpinner } from '@ionic/vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const userStore = useUserStore();
const router = useRouter();
const loading = ref(false);

function handleLogin() {
    loading.value = true;
    userStore.$login().then( res => {
        loading.value = false;
        router.push({ name: 'Seccion' });       
    }).catch( error => {
        alertController.create({
            header: 'Error de inicio de sesión',
            message: error.response.data.message,
            buttons: ['Continuar'],
            }).then(alert => alert.present());
            loading.value = false;
    })
}
</script>
