/* global window */

let store;
try {
  store = window.store
} catch (e) {
  store = global.store
}

const { width, height } = require('./constants')
const { END_GAME, CHANGE_GAME_STATE, START_GAME } = require('./actionTypes')

// Constants used for differentiating body and food -- 0 is used for empty space
const SNAKE_BODY_ELEMENT = 1
const FOOD_ELEMENT = 2


/**
 * Create a new blank grid of the specified proper size
 * NOTE that the grid is organized [row][col] or [y][x]
 *
 * @param void
 * @returns Integer[][] blank grid
 */
function blank2dGrid () {
  const blankState = []

  for (let i = 0; i < height; i += 1) {
    const row = []

    for (let j = 0; j < width; j += 1) {
      row.push(0)
    }

    blankState.push(row)
  }

  return blankState
}


/**
 * Update the game state to reflect the position of the snake and food
 *
 * @param snake
 * @param food
 * @returns void
 */
function dispatchChangeGameState (snake, food) {
  const newGameState = blank2dGrid()

  snake.body.forEach(({ x, y }) => {
    newGameState[y][x] = SNAKE_BODY_ELEMENT
  })

  if (food) {
    newGameState[food.y][food.x] = FOOD_ELEMENT
  }

  store.dispatch({
    type: CHANGE_GAME_STATE,
    newGameState,
  })
}


/**
 * Dispatch a function to the frontend to signify the game has ended
 *
 * @param void
 * @returns void
 */
function dispatchEndGame () {
  return store.dispatch({
    type: END_GAME,
  })
}


/**
 * Dispatch a function to the frontend to signify the game has started
 *
 * @param void
 * @returns void
 */
function dispatchStartGame () {
  return store.dispatch({
    type: START_GAME,
  })
}


module.exports = {
  dispatchChangeGameState,
  dispatchStartGame,
  dispatchEndGame,
}
