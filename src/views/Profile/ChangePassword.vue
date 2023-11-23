<template>
  <form @submit.prevent="store.updatePassword">
    <div class="flex flex-col mx-auto md:w-96 w-full">
      <h1 class="text-2xl font-bold mb-4 text-center">Change Password</h1>
      <div class="alert alert-success mb-4" v-show="store.status">
        {{ store.status }}
      </div>
      <div class="flex flex-col gap-2 mb-4">
        <label for="current_password" class="required"> Current Password </label>
        <input
          type="password"
          id="current_password"
          name="current_password"
          class="form-input"
          required
          v-model="store.form.current_password"
          :disabled="store.loading"
          autocomplete="current-password"
        />
        <ValidationError :errors="store.errors" field="current_password"></ValidationError>
      </div>

      <div class="flex flex-col gap-2 mb-4">
        <label for="password" class="required"> New Password </label>
        <input
          type="password"
          id="password"
          name="password"
          class="form-input"
          required
          v-model="store.form.password"
          :disabled="store.loading"
          autocomplete="new-password"
        />
        <ValidationError :errors="store.errors" field="password"></ValidationError>
      </div>

      <div class="flex flex-col gap-2 mb-4">
        <label for="password_confirmation" class="required"> New Password Confirmation </label>
        <input
          type="password"
          id="password_confirmation"
          name="password_confirmation"
          class="form-input"
          required
          v-model="store.form.password_confirmation"
          :disabled="store.loading"
          autocomplete="new-password"
        />
        <ValidationError :errors="store.errors" field="password_confirmation"></ValidationError>
      </div>

      <div class="border-t h-[1px] my-6"></div>

      <button type="submit" class="btn btn-primary" :disabled="store.loading">
        <IconSpinner v-show="store.loading" class="animate-spin"></IconSpinner>
        Update Profile
      </button>
    </div>
  </form>
</template>

<script setup>
import { onBeforeUnmount } from "vue";
import {useChangePassword} from "../../stores/changePassword"

const store = useChangePassword();

onBeforeUnmount(store.resetForm)
</script>