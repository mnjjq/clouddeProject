import Vue from 'vue'
import App from './App.vue'
import '@/styles/reset.css'
import '@/mobile/flexible'
import router from '@/router'


import { NavBar,Tabbar,TabbarItem ,Col,Row,Image as VanImage,Cell, CellGroup,Icon,Search,List  } from 'vant'
Vue.config.productionTip = false
Vue.use(NavBar)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Col)
Vue.use(Row)
Vue.use(VanImage)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Icon)
Vue.use(Search)
Vue.use(List)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
