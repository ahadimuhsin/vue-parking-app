<template>
  <form @submit.prevent="store.updateProfile">
    <div class="flex flex-col mx-auto md:w-96 w-full">
      <h1 class="text-2xl font-bold mb-4 text-center">Edit Profile</h1>
      <div class="alert alert-success mb-4" v-show="store.status">
        {{ store.status }}
      </div>
      <div class="flex flex-col gap-2 mb-4">
        <label for="name" class="required"> Name </label>
        <input
          type="text"
          id="name"
          name="name"
          class="form-input"
          autocomplete="name"
          required
          v-model="store.form.name"
          :disabled="store.loading"
        />
        <ValidationError :errors="store.errors" field="name"></ValidationError>
      </div>

      <div class="flex flex-col gap-2 mb-4">
        <label for="email" class="required"> Email </label>
        <input
          type="email"
          id="email"
          name="email"
          class="form-input"
          autocomplete="email"
          v-model="store.form.email"
          required
          :disabled="store.loading"
        />
        <ValidationError :errors="store.errors" field="email"></ValidationError>
      </div>

      <div class="border-t h-[1px] my-6"></div>

      <button type="submit" class="btn btn-primary" :disabled="store.loading">
        <IconSpinner v-show="store.loading"></IconSpinner>
        Update Profile
      </button>
    </div>
  </form>
</template>

<script setup>
import { onBeforeUnmount, onMounted } from "vue";
import {useProfile} from "../../stores/profile"

const store = useProfile();

onMounted(store.fetchProfile)
onBeforeUnmount(store.resetForm)
</script>