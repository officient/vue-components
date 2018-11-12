import Vue from 'vue'
import page from 'page'

export const data = {
  currentRoute: {} // Placed in every Page
}

// Our global navigation function
// If it's a redirect it will replace browser history instead of adding
window.go = (url, isRedirect) => {
  isRedirect ? page.redirect(url) : page.show(url)
}

// Adds the $route property to every page, contains all the date in
// page.js and our own object definition in routes.js
export const plugin = {
  install (Vue) {
    Object.defineProperty(Vue.prototype, '$route', {
      get () { return data.currentRoute }
    })
  }
}

// The router-view Vue Component that loads a component and runs
// init() on every possible change. This is better than the traditional Vue
// router because it picks up a navigation to the same page / component
// so essentially it's a refresh and init function at the same time
let currentComponent
export const RouterView = {
  name: 'router-view',
  data () {
    return data
  },
  render (createElement) {
    const el = createElement(this.currentRoute.component)
    // Set up the instance so we can reference the component later
    currentComponent = el
    return el
  },
  mounted () {
    this.initPage()
  },
  updated () {
    this.initPage()
  },
  methods: {
    // Call init whenever the component changes or is set
    initPage () {
      // Waiting until all mounted / update event loops are finished
      // There is an issue with reactivity if we don't
      // the issue is : current component is not yet ready and we are already calling this.
      this.$nextTick(() => {
        if (currentComponent.componentInstance) {
          if (currentComponent.componentInstance.init) {
            currentComponent.componentInstance.init()
          }
        }
      })
    }
  }
}

// Initializes page.js by running through all the routes.js
export function initRouter (routes) {
  routes.forEach(route => {
    page(route.path, (ctx) => {
      const $route = { ...route, ...ctx }

      // a route will always have a component to be loaded by vue, but it can also optionally have a controller
      // this controller can execute extra logic in the background (eg component shows loading screen and controller processes data)
      if (route.controller) {
        route.controller($route)
      }

      if (route.component) {
        Vue.set(data, 'currentRoute', $route)
      }
    })
  })
  page()
}
