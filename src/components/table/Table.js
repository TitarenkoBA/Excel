import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from '@components/table/table.template'
import { resizeHandler } from '@components/table/table.resize'
import { navigationHandler } from '@components/table/table.navigation'
import { selectHandler, selectGroupHandler }
  from '@components/table/table.select'
import { shouldResize, shouldSelect, idsMatrix, nextSelector }
  from '@components/table/table.functions'
import { TableSelection } from '@components/table/TableSelection'
import { $ } from '@core/dom'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown'],
      ...options,
    })
  }

  toHTML() {
    return createTable(20)
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    this.$on('formula:input', text => {
      this.selection.current.text(text)
    })

    this.$on('formula:enter', (event) => {
      event.preventDefault()
      this.selection.current.focus()
    })

    const $cell = this.$root.find('[data-id="A:1"]')
    this.selection.select($cell)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event, this.$root)
    } else if (shouldSelect(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const ids = idsMatrix($target, this.selection.current)
        selectGroupHandler(ids, this.$root, this.selection)
      } else {
        selectHandler($target, this.selection)
      }
    }
  }

  onKeydown(event) {
    const $target = $(event.target)
    const {key} = event
    const keys = [
      'Tab',
      'ArrowRight',
      'Enter',
      'ArrowDown',
      'ArrowUp',
      'ArrowLeft']
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = nextSelector($target, key)
      navigationHandler(id, this.$root, this.selection)
    }
  }
}
