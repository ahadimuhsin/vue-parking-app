import './assets/main.css'
import "../src/bootstrap"

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import ValidationErrorVue from "@/components/ValidationError.vue";
import IconSpinner from "./components/IconSpinner.vue";
import ToastPlugin from 'vue-toast-notification';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import Skeleton from 'vue-loading-skeleton';
import "vue-loading-skeleton/dist/style.css"

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ToastPlugin);
app.use(VueSweetalert2);
app.use(Skeleton)

app.component("ValidationError", ValidationErrorVue)
app.component("IconSpinner", IconSpinner)


app.mount('#app')
