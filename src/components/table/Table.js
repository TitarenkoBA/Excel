import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from '@components/table/table.template'
import { resizeHandler } from '@components/table/table.resize'
import { shouldResize, shouldSelect, idsMatrix, nextSelector }
  from '@components/table/table.functions'
import { TableSelection } from '@components/table/TableSelection'
import { $ } from '@core/dom'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
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

    this.selectCell(this.$root.find('[data-id="A:1"]'))

    this.$on('formula:input', text => {
      this.selection.current.text(text)
    })

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event, this.$root)
    } else if (shouldSelect(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const ids = idsMatrix($target, this.selection.current)
        const $cells = ids.map((id) => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selection.select($target)
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
      const $next = this.$root.find(`[data-id="${id}"]`)
      if ($next.$el) {
        this.selectCell($next)
      }
    }
  }

  onInput(event) {
    const $target = $(event.target)
    this.$emit('table:input', $target)
  }
}
