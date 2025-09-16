import { createApp } from 'vue'
import App from './App.vue'
import './theme.css'
import { router } from './router'
import { store } from './store'
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'

createApp(App).use(ToastPlugin).use(router).use(store).mount('#app')
