import { createApp } from 'vue'
import { loadFonts } from './plugins/webfontloader'
import 'vue-slider-component/theme/material.css'
import App from './App.vue'

// plugins
import { useRouter } from './router'
import { pinia, usePinia } from './plugins/pinia'
import { useVuetify } from './plugins/vuetify'
import { useI18n } from './plugins/i18n'
import { usePlayer } from './plugins/player'

// 加载css fonts等资源
loadFonts()
import 'animate.css'

const app = createApp(App)

usePinia(app)
useRouter(app)
useVuetify(app)
useI18n(app)
usePlayer(app)

app.mount('#app')
