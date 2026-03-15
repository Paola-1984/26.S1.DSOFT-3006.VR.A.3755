import { defineStore } from "pinia";
import { ref } from "vue";
import axiosRiksiri from "@/axios/axiosRiksiri";
import { url } from "node:inspector";

export const useContentStore = defineStore('content', () => {
    const menu = ref(localStorage.getItem('menu') ? JSON.parse(localStorage.getItem('menu') as string) : null);
    const content = ref({
        contenido:{
            name: '',
            contenido: '',
            youtube: '',
        },
        internal_name: '',
    }); 
    const home = ref(localStorage.getItem('home') ? JSON.parse(localStorage.getItem('home') as string) : {
        url: '',
        internal_name: '',
    });
    
   
    const next = ref({
        id: null,
        url: null,
        internal_name: '',
    });
    const loading = ref(false);
    function setContent(data: any | null){
        content.value = data || {
            contenido:{name: '', contenido: '', youtube: ''},
            internal_name: '',
            
        };
    }   
    function $setMenu(data: any | null){
        menu.value = data || [];
        if(menu.value.length > 0){
            localStorage.setItem('menu', JSON.stringify(menu.value));
        } else {
            localStorage.removeItem('menu');
        }   
    }   

    function $setHome(data: any | null){
        home.value = data || {url: '', internal_name: ''};
        localStorage.setItem('home', JSON.stringify(home.value));
    }   

    function $getContent(name: string){
        loading.value = true;
        return axiosRiksiri.get('/contenido/'+name).then( res => {
            setContent(res.data);
            loading.value = false;
            return res.data;
            }).catch(err => {
            loading.value = false;
            throw err;
        })
    }

    function $seteaSiguiente(){
        return axiosRiksiri.post('/seteasiguiente', next.value);
    }

    function $setNext(data: any | null){
        next.value = data || {};
    }

    return { content, setContent, menu, $setMenu, $getContent, loading, home, $setHome, next, $setNext, $seteaSiguiente };

});