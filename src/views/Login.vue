<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="login-wrapper">
        
        <div class="header-section">
          <img src="https://riksiri.com/logo-riksiri.png" alt="Riksiri" class="logo-top" />
          <div class="characters-row">
            <img src="https://riksiri.com/login-characters.png" alt="Personajes Riksiri" class="img-personajes" />
          </div>
          <h2 class="welcome-label">Bienvenido</h2>
        </div>

        <div class="form-section">
          <ion-item lines="none" class="input-item">
            <ion-input 
              v-model="userStore.login.username"
              type="text" 
              placeholder="Eskama" 
              class="custom-input">
            </ion-input>
          </ion-item>

          <ion-item lines="none" class="input-item">
            <ion-input 
              v-model="userStore.login.password"
              type="password" 
              placeholder="••••••" 
              class="custom-input">
            </ion-input>
          </ion-item>

          <div v-if="errorMsg" class="error-msg">{{ errorMsg }}</div>

          <ion-button 
            expand="block" 
            class="btn-ingresar" 
            :disabled="loading"
            @click="ingresar">
            <ion-icon slot="start" :icon="logInOutline"></ion-icon>
            {{ loading ? 'Ingresando...' : 'Ingresar' }}
          </ion-button>

          <ion-button 
            expand="block" 
            class="btn-registrarse"
            @click="irARegistro">
            <ion-icon slot="start" :icon="personAddOutline"></ion-icon>
            Registrarse
          </ion-button>

          <div class="footer-links">
            <a href="#" class="forgot-password">Olvidé mi contraseña</a>
          </div>
        </div>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { logInOutline, personAddOutline } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { 
  IonPage, IonContent, IonItem, IonInput, 
  IonButton, IonIcon 
} from '@ionic/vue';

const router = useRouter();
const userStore = useUserStore();

const loading = ref(false);
const errorMsg = ref('');

const ingresar = async () => {
  errorMsg.value = '';

  if (!userStore.login.username || !userStore.login.password) {
    errorMsg.value = 'Por favor ingresa tu Eskama y contraseña';
    return;
  }

  loading.value = true;
  try {
    await userStore.$login();
    router.push({ name: 'SeccionContenidos', params: { name: 'que-es-riksiri' } });
  } catch (error) {
    errorMsg.value = 'Eskama o contraseña incorrectos';
  } finally {
    loading.value = false;
  }
};

const irARegistro = () => {
  router.push({ name: 'Registro' });
};
</script>

<style scoped>
.login-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #ffffff;
}
.header-section {
  text-align: center;
  margin-bottom: 25px;
}
.logo-top {
  max-width: 110px;
  margin-bottom: 15px;
}
.img-personajes {
  max-width: 280px;
  height: auto;
}
.welcome-label {
  color: #7a7a7a;
  font-size: 1.3rem;
  margin-top: 10px;
}
.form-section {
  width: 100%;
  max-width: 320px;
}
.input-item {
  --background: #fffbe6;
  --border-radius: 10px;
  margin-bottom: 12px;
  border: 1px solid #ffe58f;
}
.custom-input {
  --padding-start: 15px;
  font-size: 16px;
}
.btn-ingresar {
  --background: #e8eaf6; 
  --color: #3f51b5;
  --border-radius: 8px;
  --box-shadow: none;
  margin-top: 20px;
  font-weight: 600;
  text-transform: none;
}
.btn-registrarse {
  --background: #e8f5e9;
  --color: #2e7d32;
  --border-radius: 8px;
  --box-shadow: none;
  margin-top: 12px;
  font-weight: 600;
  text-transform: none;
}
.footer-links {
  margin-top: 15px;
}
.forgot-password {
  text-decoration: none;
  color: #5c6bc0;
  font-size: 0.9rem;
}
.error-msg {
  color: #c62828;
  font-size: 0.85rem;
  text-align: center;
  margin-bottom: 8px;
}
</style>