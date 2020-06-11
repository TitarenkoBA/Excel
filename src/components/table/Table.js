import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from '@components/table/table.template'
import { $ } from '@core/dom'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    })
    // this.$el = null
    // this.isResizing = false
    // this.resizingType = null
    // this.X = { start: 0, current: 0 }
    // this.Y = { start: 0, current: 0 }
  }

  toHTML() {
    return createTable(20)
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target)
      const $parent = $resizer.closest('[data-type="resizable"')
      const coords = $parent.getCoords()
      const type = $resizer.data.resize
      const cells = this.$root
          .findAll(`[data-column="${$parent.data.column}"]`)
      let deltaWidth = null
      let valueWidth = null
      let deltaHeight = null
      let valueHeight = null

      document.onmousemove = e => {
        if (type === 'col') {
          deltaWidth = e.pageX - coords.right
          valueWidth = coords.width + deltaWidth
        }

        if (type === 'row') {
          deltaHeight = e.pageY - coords.bottom
          valueHeight = coords.height + deltaHeight
        }
      }

      document.onmouseup = () => {
        $parent.css({
          height: valueHeight + 'px',
          width: valueWidth + 'px',
        })
        cells.forEach((elem) => {
          elem.style.width = valueWidth + 'px'
        })
        valueHeight = null
        valueWidth = null
        document.onmousemove = null
      }
      // this.resizingType = event.target.dataset.resize
      // this.isResizing = true
      // this.$el = event.target
      // this.X.start = event.clientX
      // this.Y.start = event.clientY
    }
  }

  // onMousemove(event) {
  //   if (this.isResizing === true) {
  //     this.X.current = event.clientX
  //     this.Y.current = event.clientY
  //   }
  // }

  // onMouseup() {
  //   if (this.isResizing === true) {
  //     if (this.resizingType === 'row') {
  //       const newHeight = this.Y.current - this.Y.start +
  //         this.$el.parentElement.parentElement.offsetHeight
  //       this.$el.parentElement.parentElement.style.height = newHeight + 'px'
  //     }
  //     if (this.resizingType === 'col') {
  //       const newWidth = this.X.current - this.X.start +
  //         this.$el.parentElement.offsetWidth
  //       const cells = document.querySelectorAll(`
  //         div[data-column="${this.$el.parentElement.textContent.trim()}"]`)
  //       cells.forEach((elem) => {
  //         elem.style.width = newWidth + 'px'
  //       })
  //       this.$el.parentElement.style.width = newWidth + 'px'
  //     }
  //     this.isResizing = false
  //     this.X = { start: 0, current: 0 }
  //     this.Y = { start: 0, current: 0 }
  //   }
  // }
}
