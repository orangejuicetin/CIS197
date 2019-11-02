const x = 48
const y = 36

// Create an array of dimensions x by y filled with false
const cells = Array.apply(null, Array(x * y)).map(() => {
  return false
})

export { x, y, cells }
