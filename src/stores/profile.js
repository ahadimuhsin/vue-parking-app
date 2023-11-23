import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const $toast = useToast();
export const useProfile = defineStore("profile", () => {
    const errors = reactive({});
    const status = ref("");
    const loading = ref(false);
    
    const form = reactive({
        name: "",
        email: ""
    });

    let resetForm = () => {
        form.name = "";
        form.email = "";

        errors.value = {};
        status.value = "";
    }

    async function fetchProfile()  {
        return window.axios.get("profile")
        .then((response) => {
            console.log(response.data[0].name)
            form.name = response.data[0].name;
            form.email = response.data[0].email;
        })
    }

    async function updateProfile(){
        loading.value = true;
        errors.value = {};
        status.value = "";

        return window.axios
        .put("profile", form)
        .then((response) => {
            form.name = response.data.name;
            form.email = response.data.email;
            status.value = "Profile has been updated";
            $toast.open({
                message: status.value,
                type: "success",
                position: "top-right"
            });
        })
        .catch((error) => {
            if(error.response.status === 422)
            {
                errors.value = error.response.data.errors;
            }
        })
        .finally(() => {
            loading.value = false
        })
    }

    return {errors, status, loading, resetForm, fetchProfile, updateProfile, form}
})