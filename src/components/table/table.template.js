import { defaultStyles } from '@/constants'
import { camelToDashCase } from '@core/utils'

const CODES = {
  A: 65,
  Z: 90,
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function toCell(state, row) {
  return function(_, index) {
    const column = toChar(null, index)
    const width = getWidth(state.colState, index)
    const id = `${ column }:${ row + 1 }`
    const data = state.dataState[id]
    const styles = Object.keys(defaultStyles)
        .map( key => `${camelToDashCase(key)}: ${defaultStyles[key]}`)
        .join(';')
    return `
      <div 
        class="cell"
        contenteditable
        data-column="${column}"
        data-id="${id}"
        style="${styles}; width: ${width}"
      >
        ${data || ''}
      </div>`
  }
}

function toColumn({col, index, width}) {
  const i = toChar(null, index)
  return `
    <div
      class="column"
      data-type="resizable"
      data-column="${i}"
      style="width: ${width}"
    >
      ${col}
      <div class="col-resize" data-resize="column"></div>
    </div>`
}

function createRow(index, content, rowState) {
  const resize = index ? `<div class="row-resize" data-resize="row"></div>` : ''
  const indexRow = index ? index : ''
  const height = getHeight(rowState, index)
  return `
    <div
      class="row"
      data-type="resizable"
      data-row="${indexRow}"
      style="height: ${height}"
    >
      <div class="row-info">
        ${indexRow}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function getWidth(colState, index) {
  const i = toChar(null, index)
  return (colState[i] || DEFAULT_WIDTH) + 'px'
}
function getHeight(rowState, index) {
  return (rowState[index] || DEFAULT_HEIGHT) + 'px'
}

function withWidthFrom(colState) {
  return function(col, index) {
    return {
      col, index, width: getWidth(colState, index),
    }
  }
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state.colState))
      .map(toColumn)
      .join('')

  rows.push(createRow(null, cols, {}))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(state, row))
        .join('')
    rows.push(createRow(row + 1, cells, state.rowState))
  }

  return rows.join('')
}
