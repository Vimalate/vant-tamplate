export const debounce = (() => {
  let timer = null
  return (callback, wait = 800) => {
    clearTimeout(timer)
    timer = setTimeout(callback, wait)
  }
})()
