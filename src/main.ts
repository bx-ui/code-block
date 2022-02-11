import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import dataV from '@jiaminghi/data-view'
// 引入全局css
import './assets/scss/style.scss'
// 引入图表（所有图标见 icon 目录下的 demo_index.html）
import './assets/icon/iconfont.css'
// 引入 全局注册组件
import PublicComponent from '@/components/componentInstall'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElIconModules from '@element-plus/icons'

const app = createApp(App)
// 统一注册Icon图标
for (const iconName in ElIconModules) {
  if (Reflect.has(ElIconModules, iconName)) {
    const item = ElIconModules[iconName]
    app.component(iconName, item)
  }
}
app.use(PublicComponent)
// app.use(dataV)
app.use(store)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
