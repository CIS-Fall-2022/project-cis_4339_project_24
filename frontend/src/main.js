import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import './index.css'

const app = createApp(App);
app.use(router);
app.mount('#app');


import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

app.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true
});