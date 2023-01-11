import { createApp } from 'vue'
//引入重置样式的库
import 'normalize.css'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(store)
app.use(router)
app.mount('#app')
