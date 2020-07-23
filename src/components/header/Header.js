import { ExcelComponent } from '@core/ExcelComponent'
import { $ } from '@core/dom'
import * as actions from '@/redux/actions'
import { defaultTitle } from '@/constants'
import { debounce } from '@core/utils'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    })
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle
    return `
      <input type="text" class="input" value="${title}" />

      <div>

        <div class="button" data-type="delete">
          <i class="material-icons" data-type="delete">delete</i>
        </div>

        <div class="button" data-type="exit">
          <i class="material-icons" data-type="exit">exit_to_app</i>
        </div>

      </div>
    `
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(actions.changeTitle($target.text()))
  }

  onClick(event) {
    if (event.target.dataset.type) {
      if (event.target.dataset.type === 'exit') {
        window.location.hash = '#dashboard'
      } else {
        console.log(window.location.hash.slice(7))
      }
    }
  }
}
