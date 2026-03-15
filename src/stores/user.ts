import { defineStore } from "pinia";
import { ref } from "vue";
import axiosRiksiri from "@/axios/axiosRiksiri";
import { useContentStore } from "./content";

export const useUserStore = defineStore('user', () => {
    const token = ref(localStorage.getItem('token') || null);
    const registro = ref({
        usuario: null,
        email: null,
        password: null,
    });
    const login = ref({
        username: null,
        password: null,
    });

    const contentStore = useContentStore();
    // aquí estoy guardando los datos de usuario
    const userData = ref(localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData') as string) : null); 

    function $setLogin(data: any | null){
        token.value = data?.token || null;
        if(token.value){
            localStorage.setItem('token', token.value || '');
            localStorage.setItem('userData', JSON.stringify(data.user));
            userData.value = data.user;
            contentStore.$setMenu(data.menu);
            contentStore.$setHome(data.home);
        }else{
            localStorage.removeItem('token');
            localStorage.removeItem('userData');
        }
    }

    function $logout(){
        token.value = null;
        userData.value = null;
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        localStorage.removeItem('menu');
        localStorage.removeItem('home');
    }
    function $login(){
        return axiosRiksiri.post('login', login.value).then( res => {
            $setLogin(res.data);
            return res.data;
        })
    }

    function $registro(){
        return axiosRiksiri.post('register', registro.value).then( res => {
            $setLogin(res.data);
            return res.data;
        })
    }
    return { registro, login, $login, token, $setLogin, userData, $registro, $logout };
});