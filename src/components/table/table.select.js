export function selectGroupHandler(ids, $root, selection) {
  const $cells = ids.map((id) => $root.find(`[data-id="${id}"]`))
  selection.selectGroup($cells)
}

export function selectHandler($target, selection) {
  selection.select($target)
}

