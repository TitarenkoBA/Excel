import { $ } from '@core/dom'

export function resizeHandler(event, $root) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"')
  const coords = $parent.getCoords()
  const type = $resizer.data.resize
  let delta = null
  let value = null
  const resizerWidth = $resizer.$el.offsetWidth
  const resizerHeight = $resizer.$el.offsetHeight

  document.onmousemove = e => {
    if (type === 'col') {
      delta = e.pageX - coords.right
      value = coords.width + delta
      if (value <
        parseInt(getComputedStyle($parent.$el)['min-width'])) {
        return
      }
      $resizer.css({
        left: value - resizerWidth + 'px',
      })
    } else if (type === 'row') {
      delta = e.pageY - coords.bottom
      value = coords.height + delta
      if (value <
        parseInt(getComputedStyle($parent.$el)['min-height'])) {
        return
      }
      $resizer.css({
        top: value - resizerHeight + 'px',
      })
    }
  }

  document.onmouseup = () => {
    if (type === 'col') {
      $parent.css({
        width: value + 'px',
      })
      $root
          .findAll(`[data-column="${$parent.data.column}"]`)
          .forEach((elem) => {
            elem.style.width = value + 'px'
          })
    } else if (type === 'row') {
      $parent.css({
        height: value + 'px',
      })
    }

    value = null
    document.onmousemove = null
    document.onmouseup = null
  }
}
