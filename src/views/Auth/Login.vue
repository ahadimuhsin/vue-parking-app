<template>
  <form @submit.prevent="store.handleSubmit" novalidate>
    <div class="flex flex-col mx-auto md:w-96 w-full">
      <h1 class="text-exl font-bold mb-4 text-center">Login</h1>
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
          autofocus
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
          class="p-1 border bg-gray-100"
          autocomplete="current-password"
          v-model="store.form.password"
          required
          :disabled="store.loading"
        />
        <ValidationError :errors="store.errors" field="password"></ValidationError>
      </div>

      <div class="flex flex-col gap-2">
        <label for="flex gap-2 items-center hover:cursor-pointer">
          <input type="checkbox" v-model="store.form.remember"
          class="w-4 h-4" :disabled="store.loading">
          <span class="select-none"> Remember Me</span>
        </label>
      </div>

      <div class="border-t h-[1px] my-6"></div>

      <div class="flex flex-col gap-2">
        <button type="submit" class="btn btn-primary" :disabled="store.loading">
            <IconSpinner v-show="store.loading"></IconSpinner>
            Login
        </button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { onBeforeUnmount } from "vue";
import { useLogin } from "../../stores/login";

const store = useLogin();
onBeforeUnmount(store.resetForm)
</script>