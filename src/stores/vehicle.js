import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
export const useVehicle = defineStore("vehicle", () => {
    const router = useRouter();
    const errors = reactive({});
    const loading = ref(false);
    const vehicles = ref([]);

    const form = reactive({
        plate_number: "",
        description: ""
    });

    function resetForm()
    {
        form.plate_number = "";
        form.description = "";

        errors.value = {};
    }

    function storeVehicle()
    {
        if(loading.value) return;

        loading.value = true;
        errors.value = {};

        window.axios.post("vehicles", form)
        .then(() => {
            router.push({name: "vehicles.index"})
        })
        .catch((error) => {
            if(error.response.status === 422)
            {
                errors.value = error.response.data.errors
            }
        })
        .finally(() => {
            form.plate_number = "";
            form.description = "";
            loading.value = false
        })
    }

    function getVehicles()
    {
        return window.axios
        .get("vehicles")
        .then((response) => (vehicles.value = response.data.data))
    }

    function updateVehicle(vehicle)
    {
        if(loading.value) return;

        loading.value = true;
        errors.value = {};

        window.axios.put(`vehicles/${vehicle.id}`, form)
        .then(() => {
            router.push({name: 'vehicles.index'})
        })
        .catch((error) => {
            if(error.response.status === 422)
            {
                errors.value = error.response.data.errors
            }
        }).finally(() => {
            loading.value = false
        })
    }

    function getVehicle(vehicle)
    {
        window.axios.get(`vehicles/${vehicle.id}`)
        .then((response) => {
            console.log(response)
            form.plate_number = response.data.data.plate_number;
            form.description = response.data.data.description;
        })
    }

    function deleteVehicle(vehicle)
    {
        window.axios.delete(`vehicles/${vehicle.id}`)
            .then(getVehicles);
        // let deleteConfirmation = confirm("Are you sure you want to delete this vehicle?");

        // if(deleteConfirmation)
        // {
            
        // }
        
    }

    return {errors, loading, storeVehicle, 
        resetForm, form, 
        getVehicles, vehicles, getVehicle, 
        updateVehicle, deleteVehicle}
})