import { defineStore } from "pinia";
import { ref } from "vue";
import axiosRiksiri from "@/axios/axiosRiksiri";

export const useContentStore = defineStore('content', () => {
    const menu = ref(localStorage.getItem('menu') ? JSON.parse(localStorage.getItem('menu') as string) : null);
    const content = ref({
        contenido:{
            name: null,
            contenido: null,
            youtube: '',
        }
    }); 
    const loading = ref(false);
    function setContent(data: any | null){
        content.value = data || {
            
        };
    }   
    function $setMenu(data: any | null){
        menu.value = data || [];
        if(menu.value){
            localStorage.setItem('menu', JSON.stringify(menu.value));
        } else {
            localStorage.removeItem('menu');
        }   
    }   

    function $getContent(name: string) {
    loading.value = true;
    return axiosRiksiri.get('/contenido/' + name)
        .then(res => {
            setContent(res.data);
            loading.value = false; // Se apaga la línea azul si hay éxito
            return res.data;
        })
        .catch(error => {
            console.error("Error al cargar contenido:", error);
            loading.value = false; // ¡IMPORTANTE! Se apaga la línea azul aunque falle
            return null;
        });
}

    return { content, setContent, menu, $setMenu, $getContent, loading };

});