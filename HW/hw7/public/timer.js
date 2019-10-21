import * as actions from './actions'

let interval = null
let store = null

/**
 * Run the app by setting the interval if there is one
 */
const run = () => {
  if (!interval) {
    interval = setInterval(() => {
      store.dispatch(actions.step())
    }, 1)
  }
}

/**
 * If an interval exists, clear the interval and set it to null
 */
const stop = () => {
  if (interval) {
    clearInterval(interval)
    interval = null
  }
}

/**
 * Setter method for the Redux store of the app
 *
 * @param {Store} s
 */
const setStore = s => {
  store = s
}

export { run, stop, setStore }
