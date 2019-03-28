// Required for referencing .vue files in .ts files.
/// <reference path="../vue-shims.d.ts" />

import vueRouter from 'vue-router'

import { RouteNames } from './customTypes/enums/RouteNames'

const homeVue = lazyLoadComponent('./components/content/home')
const page404Vue = lazyLoadComponent('./components/content/page404')

const routes = [
  { path: '/', component: homeVue, name: RouteNames.home },
  { path: '*', component: page404Vue, name: RouteNames.route404 }
]

const router = new vueRouter({
  routes
})

// https://router.vuejs.org/guide/advanced/lazy-loading.html#grouping-components-in-the-same-chunk
function lazyLoadComponent(componentFilePath) {
  // appending .vue rather than passing in the whole path prevents the critical dependency
  // Critical dependency: the request of a dependency is an expression
  return () => import(`${componentFilePath}.vue`)
}

export { router }
