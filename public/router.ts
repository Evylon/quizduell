// Required for referencing .vue files in .ts files.
/// <reference path="../vue-shims.d.ts" />

import vueRouter from 'vue-router'

const remoteVue = lazyLoadComponent('./components/pages/remote')
const localVue = lazyLoadComponent('./components/pages/local')
const page404Vue = lazyLoadComponent('./components/pages/page404')

const routes = [
  { path: '/', component: remoteVue, name: 'remote' },
  { path: '/local', component: localVue, name: 'local' },
  { path: '*', component: page404Vue, name: '404' }
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
