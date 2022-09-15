/*=========================================================================================
  File Name: main.js
  Description: main vue(js) file
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import App from './App.vue'

// Vuesax Component Framework
import Vuesax from 'vuesax'

Vue.use(Vuesax)

// axios
import axios from "./axios.js"
Vue.prototype.$http = axios


// Theme Configurations
import '../themeConfig.js'


// Globally Registered Components
import './globalComponents.js'


// Vue Router
import router from './router'


// Vuex Store
import store from './store/store'


// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)


// PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'


// Vue select css
// Note: In latest version you have to add it separately
// import 'vue-select/dist/vue-select.css';


// VeeValidate
import VeeValidate from 'vee-validate'
Vue.use(VeeValidate);

import IdleVue from "idle-vue";


// ACL
//import acl from './acl/acl'


Vue.config.productionTip = false

const eventsHub = new Vue({
    router,
    store,
    // IdleVue,
    //acl,
    render: h => h(App)
}).$mount('#app')

Vue.use(IdleVue, {
  eventEmitter: eventsHub,
  store,
  idleTime: 300000, // 30 seconds,
  startAtIdle: false
  });