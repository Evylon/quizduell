// Required for referencing .vue files in .ts files.
// Reference is passed onto all child components
/// <reference path="../vue-shims.d.ts" />

import vue from 'vue'
import vueRouter from 'vue-router'
import vuex from 'vuex'

// ES6 Polyfill
// https://github.com/vuejs-templates/webpack/issues/260
import 'es6-promise/auto'

vue.use(vueRouter)
vue.use(vuex)

import baseVue from './components/base.vue'
import { router } from './router'
import { store } from './store' // Store must come after vuex

// Internal Styling
// import './base.css'

const app = new vue({
    router,
    store,
    el: '#app',
    template: '<base-vue />',
    components: { baseVue },
}).$mount('#app')
