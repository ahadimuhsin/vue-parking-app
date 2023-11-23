<template>
  <form @submit.prevent="store.handleSubmit" novalidate>
    <div class="flex flex-col mx-auto md:w-96 w-full">
      <h1 class="text-exl font-bold mb-4 text-center">Register</h1>
      <div class="flex flex-col gap-2 mb-4">
        <label for="name" class="required"> Name </label>
        <input type="text" id="name" name="name" 
        class="form-input" autocomplete="name" required
        v-model="store.form.name" :disabled="store.loading"/>
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

      <div class="flex flex-col gap-2 mb-4">
        <label for="password" class="required"> Password </label>
        <input
          type="password"
          id="password"
          name="password"
          class="form-input"
          autocomplete="new-password"
          v-model="store.form.password"
          required
          :disabled="store.loading"
        />
        <ValidationError :errors="store.errors" field="password"></ValidationError>
      </div>

      <div class="flex flex-col gap-2 mb-4">
        <label for="password_confirmation" class="required"> Confirm Password </label>
        <input
          type="password"
          id="password_confirmation"
          name="password_confirmation"
          class="form-input"
          autocomplete="new-password"
          required
          v-model="store.form.password_confirmation"
          :disabled="store.loading"
        />
      </div>

      <div class="border-t h-[1px] my-6"></div>

      <div class="flex flex-col gap-2">
        <button type="submit" class="btn btn-primary" :disabled="store.loading">
            <IconSpinner v-show="store.loading"></IconSpinner>
            Register
        </button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { onBeforeUnmount } from "vue";
import { useRegister } from "../../stores/register";

const store = useRegister();
onBeforeUnmount(store.resetForm)
</script>