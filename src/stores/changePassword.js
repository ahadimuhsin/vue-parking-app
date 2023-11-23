import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { useToast } from "vue-toast-notification";
import 'vue-toast-notification/dist/theme-sugar.css';
const $toast = useToast();

export const useChangePassword = defineStore("change-password", () => {
    const errors = reactive({});
    const status = ref("")
    const loading = ref(false)

    const form = reactive({
        current_password : "",
        password : "",
        password_confirmation : "",
    });

    function resetForm(){
        form.current_password = "";
        form.password = "";
        form.password_confirmation = "";

        errors.value = {}
        status.value = ""
    }

    async function updatePassword()
    {
        loading.value = true
        errors.value = {}
        status.value = ""

        return window.axios.put("password", form)
        .then(() => {
            status.value = "Password has been updated"
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
                $toast.open({
                    message: errors.value.current_password[0],
                    type: "error",
                    position: "top-right"
                });
            }
        })
        .finally(() => {
            form.current_password = "";
            form.password = "";
            form.password_confirmation = "";
            loading.value = false
        })
    }

    return {form, loading, errors, status, resetForm, updatePassword}
})