const CODES = {
  A: 65,
  Z: 90,
}

function toCell(row, index) {
  return function(_, index) {
    const column = toChar(null, index)
    return `
      <div 
        class="cell"
        contenteditable
        data-column="${column}"
        data-id="${column}:${row + 1}"
        >
      </div>`
  }
}

function toColumn(col, index) {
  const i = toChar(null, index)
  return `
    <div class="column" data-type="resizable" data-column="${i}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>`
}

function createRow(index, content) {
  const resize = index ? `<div class="row-resize" data-resize="row"></div>` : ''
  const indexRow = index ? index : ''
  return `
    <div class="row" data-type="resizable" data-row_index="${indexRow}">
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

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')
  rows.push(createRow(null, cols))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(row))
        .join('')
    rows.push(createRow(row + 1, cells))
  }

  return rows.join('')
}
