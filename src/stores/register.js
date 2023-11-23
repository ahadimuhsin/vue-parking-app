import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { useAuth } from "./auth";

const $toast = useToast();

export const useRegister = defineStore("register", () => {
    const errors = reactive({});
    const loading = ref(false);
    const auth = useAuth();
    const form = reactive({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    function resetForm(){
        form.name = "";
        form.email = "";
        form.password = "";
        form.password_confirmation = "";

        errors.value = {};
    }
    
    async function handleSubmit()
    {
        if(loading.value){
            return;
        }
        loading.value = true;

        errors.value = {};
        return window.axios.post("auth/register", form)
        .then((response) => {
            auth.login(response.data.access_token, "register")
            $toast.open({
                message: response.data.message,
                type: "success",
                position: "top-right"
            });
        })
        .catch((err) => {
            if(err.response.status === 422)
            {
                errors.value = err.response.data.errors;
            }
        })
        .finally(() => {
            form.password = "";
            form.password_confirmation = "";
            loading.value = false;
        })
    }
    return {form, resetForm, handleSubmit, errors, loading}
})