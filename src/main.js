import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
//conectar a firebase
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './config/firebase'

//formkit
import {plugin, defaultConfig} from '@formkit/vue'
import config from '../formkit.config'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(VueFire, {
   firebaseApp,
   modules: [VueFireAuth()],
})

app.use(createPinia()) // NOS AGREGA EL PINIA A NUESTRA APP
app.use(router) // NOS AGREGA EL ROUTER A NUESTRA APP
app.use(plugin, defaultConfig(config)) // NOS AGREGA EL FORMKIT A NUESTRA APP
app.mount('#app')
