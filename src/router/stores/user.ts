import { defineStore } from "pinia";
import { ref } from "vue";
import axiosRiksiri from "@/axios/axiosRiksiri";
import axios from "axios";

export const useUserStore = defineStore('user', () => {
    const registro = ref({
        usuario: null,
        email: null,
        password: null,
    });
    const login = ref({
        username: null,
        password: null,
    });
    function $login(){
    return axiosRiksiri.post('login',login.value)
 }
return { registro, login, $login };
});