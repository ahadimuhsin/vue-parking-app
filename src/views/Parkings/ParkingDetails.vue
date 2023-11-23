<script setup>
import { onBeforeMount, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useParking } from '../../stores/parking'

const store = useParking()
const route = useRoute()

watchEffect(async () => {
  store.getParking({ id: route.params.id })
})

onBeforeMount(store.resetParkingDetails)
</script>

<template>
  <div class="flex flex-col mx-auto md:w-96 w-full" v-if="store.parking.id !== undefined">
    <h1 class="text-2xl font-bold mb-4 text-center">
      Parking Order Details
      </h1>
    <div class="border p-2 font-mono">
      <div class="font-bold uppercase mb-4">Parking Order #{{ store.parking.id }}</div>

      <div class="font-bold uppercase">License Plate</div>
      <div class="plate text-2xl">
        {{ store.parking.vehicle.plate_number ?? 'N/A' }}
      </div>

      <div class="font-bold uppercase">Description</div>
      <div class="plate text-2xl">
        {{ store.parking.vehicle.description ?? 'N/A' }}
      </div>

      <div class="font-bold uppercase">Zone</div>
      <div class="plate text-2xl">
        {{ store.parking.zone.name ?? 'N/A' }}
      </div>

      <div class="font-bold uppercase">Price</div>
      <div class="plate text-2xl">
        {{ (store.parking.zone.price_per_hour / 100).toFixed(2) }}
      </div>

      <div class="font-bold uppercase">From</div>
      <div class="plate text-2xl">
        {{ store.parking.start_time ?? 'N/A' }}
      </div>

      <div class="font-bold uppercase">To</div>
      <div class="plate text-2xl">
        {{ store.parking.stop_time ?? 'N/A' }}
      </div>

      <div class="font-bold uppercase">Total</div>
      <div class="plate text-2xl">{{ (store.parking.total_price / 100).toFixed(2) }} &euro;</div>
    </div>

    <div class="border-t h-[1px] my-6"></div>

    <router-link :to="{name: 'parkings.history'}"
    class="btn btn-secondary uppercase">
    Return
    </router-link>
  </div>

  <PuSkeleton class="flex flex-col mx-auto md:w-96 w-full" v-else>
  </PuSkeleton>
</template>