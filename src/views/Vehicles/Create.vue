<template>
    <form @submit.prevent="store.storeVehicle" novalidate>
        <div class="flex flex-col mx-auto md:w-96 w-full">
            <h1 class="text-2xl font-bold mb-4 text-center">
                Add Vehicle
            </h1>
            <div class="flex flex-col gap-2 mb-4">
                <label for="plate_number" class="required">
                    License Plate
                </label>
                <input type="text" name="plate_number" id="plate_number"
                v-model="store.form.plate_number"
                class="form-input plate"
                placeholder="B 1111 ASU"
                :disabled="store.loading">
                <ValidationError :errors="store.errors" field="plate_number"></ValidationError>
            </div>

            <div class="flex flex-col gap-2">
                <label for="description" class="required">
                    Description
                </label>
                <input type="text" name="description" id="description"
                v-model="store.form.description"
                class="form-input"
                placeholder="Toyota yang kenceng banget"
                :disabled="store.loading">
                <ValidationError :errors="store.errors" field="description"></ValidationError>
            </div>

            <div class="border-t h-[1px] my-6"></div>

            <div class="flex gap-2">
                <button type="submit" class="btn btn-primary w-full" :disabled="store.loading">
                    <IconSpinner v-show="store.loading" class="animate-spin"></IconSpinner>
                    Save
                </button>
                <router-link :to="{name: 'vehicles.index'}" class="btn btn-secondary">
                    Cancel
                </router-link>
            </div>
        </div>
    </form>
</template>

<script setup>
import { onBeforeUnmount } from 'vue';
import {useVehicle} from '../../stores/vehicle'

const store = useVehicle();
onBeforeUnmount(store.resetForm)
</script>