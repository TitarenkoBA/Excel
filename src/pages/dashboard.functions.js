function toHTML(el) {
  const date = new Date(+el.slice(6))
  return `
    <li class="db__record">
      <a href="#${el.replace(':', '/')}">
        ${JSON.parse(localStorage.getItem(el)).title}
      </a>
      <strong>${date}</strong>
    </li>
  `
}

export function getAllKeys() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.includes('excel')) {
      continue
    }
    keys.push(key)
  }
  return keys
}

export function createRecordsTable() {
  const keys = getAllKeys()

  if (!keys.length) {
    return `<p>You didn't create a project yet</p>`
  }

  return `
  <div class="db__list-header">
    <span>Название</span>
    <span>Дата открытия</span>
  </div>
  <ul class="db__list">
    ${keys.map(toHTML).join('')}
  </ul>
  `
}
