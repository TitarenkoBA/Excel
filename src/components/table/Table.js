import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from '@components/table/table.template'
import { resizeHandler } from '@components/table/table.resize'
import { shouldResize } from '@components/table/table.functions'
import { shouldSelect } from '@components/table/table.functions'
import { $ } from '@core/dom'
import { TableSelection } from '@components/table/TableSelection'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
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

    const $cell = this.$root.find('[data-id="A:1"]')
    this.selection.select($cell)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event, this.$root)
    } else if (shouldSelect(event)) {
      this.selection.select($(event.target))
    }
  }
}
