export function navigationHandler(id, $root, selection) {
  const $next = $root.find(`[data-id="${id}"]`)
  if ($next.$el) {
    selection.select($next)
  }
}
