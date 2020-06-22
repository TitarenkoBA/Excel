import { range } from '@core/utils'

export function shouldResize(event) {
  return event.target.dataset.resize
}

export function shouldSelect(event) {
  return event.target.dataset.id
}

export function idsMatrix($target, $current) {
  const target = $target.id(true)
  const current = $current.id(true)

  const cols = range(current.col, target.col)
  const rows = range(current.row, target.row)

  const ids = cols.reduce((acc, col) => {
    rows.forEach((row) => {
      acc.push(`${String.fromCharCode(col)}:${row}`)
    })
    return acc
  }, [])

  return ids
}

export function nextSelector($target, key) {
  const target = $target.id(true)
  switch (key) {
    case 'Tab':
    case 'ArrowRight':
      target.col++
      break
    case 'Enter':
    case 'ArrowDown':
      target.row++
      break
    case 'ArrowUp':
      target.row--
      break
    case 'ArrowLeft':
      target.col--
      break
  }

  const id = `${String.fromCharCode(target.col)}:${target.row}`

  return id
}
