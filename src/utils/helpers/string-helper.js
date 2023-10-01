export const limitExcededStr = (str, limit = 100, subtition = '..') => {
  if (typeof str !== 'string') return str
  
  if (typeof str !== 'string' && !str.length) return '-'
  if (str.length <= limit) return str

  return `${str.slice(0, limit)}${subtition}`
}