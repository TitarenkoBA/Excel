export function parse(value = '') {
  if (value.startsWith('=') && (!/[-()+*/]$/.test(value))) {
    try {
      return eval(value.slice(1))
    } catch (e) {
      console.warn('Skipping parse error', e.message)
    }
  }
  return value
}
