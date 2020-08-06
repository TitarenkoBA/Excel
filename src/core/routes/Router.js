import { $ } from '@core/dom'
import { ActiveRoute } from '@core/routes/ActiveRoute'
import { Loader } from '@components/Loader'

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('selector is not provided in Router')
    }

    this.$placeholder = $(selector)
    this.routes = routes
    this.loader = new Loader()
    this.page = null

    this.changePageHandler = this.changePageHandler.bind(this)

    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }

  async changePageHandler() {
    if (this.page) {
      this.page.destroy()
    }

    this.$placeholder.clear().append(this.loader)

    const route = ActiveRoute.path.includes('excel') ? 'excel' : 'dashboard'

    const Page = this.routes[route]

    this.page = new Page(ActiveRoute.params)

    const root = await this.page.getRoot()

    this.$placeholder.clear().append(root)

    this.page.afterRender()
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }
}
