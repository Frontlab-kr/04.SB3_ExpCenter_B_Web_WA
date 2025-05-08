/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import store from "./store";
import i18n from './i18n';
// Composables
import { createApp } from 'vue'

const app = createApp(App)
app.use(store)
app.use(i18n);

registerPlugins(app)


app.mount('#app')