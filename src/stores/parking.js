import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

export const useParking = defineStore("parking", () => {
    const router = useRouter()
    const errors = reactive({})
    const loading = ref(false)

    const form = reactive({
        vehicle_id : null,
        zone_id : null
    });

    const parkings = ref([]);
    const stoppedParkings = ref([]);
    const parkingDetails = ref({});

    function getActiveParkings()
    {
        return window.axios.get("parkings")
        .then((response) => {
            parkings.value = response.data.data
            // console.log(parkings)
            return parkings;
        })
    }

    function stopParking(parking)
    {
        window.axios.put(`parkings/${parking.id}`).then(getActiveParkings)
    }

    function resetForm()
    {
        form.vehicle_id = null;
        form.zone_id = null;

        errors.value = {};
    }

    function startParking()
    {
        if(loading.value) return;

        loading.value = false
        errors.value = {}

        return window.axios.post("parkings/start", form)
        .then(() => {
            router.push({name: "parkings.active"})
        })
        .catch((error) => {
            if(error.response.status === 422)
            {
                errors.value = error.response.data.errors;
            }
        })
        .finally(() => (loading.value = false))
    }

    function historyParkings()
    {
        return window.axios.get("parkings/history")
        .then((response) => {
            stoppedParkings.value = response.data.data
        })
    }

    function resetParkingDetails(){
        parkingDetails.value = {};
    }

    function getParking(parking)
    {
        return window.axios.get(`parkings/${parking.id}`)
        .then((response) => {
            parkingDetails.value = response.data.data
        })
    }

    return {form, errors, loading, resetForm, 
        startParking, parkings, getActiveParkings, 
        stopParking, stoppedParkings, historyParkings,
        resetParkingDetails, 
        getParking, 
        parking: parkingDetails}
})