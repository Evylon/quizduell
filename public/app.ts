// Required for referencing .vue files in .ts files.
// Reference is passed onto all child components
/// <reference path="../vue-shims.d.ts" />

import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

// ES6 Polyfill
// https://github.com/vuejs-templates/webpack/issues/260
import 'es6-promise/auto'

Vue.use(VueRouter)
Vue.use(Vuex)

import baseVue from './components/base.vue'
import { router } from './router'
import { store } from './store' // Store must come after vuex

new Vue({
    router,
    store,
    el: '#app',
    template: '<base-vue />',
    components: { baseVue },
}).$mount('#app')
