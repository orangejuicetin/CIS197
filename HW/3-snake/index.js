/* global window */

const {
  dispatchChangeGameState,
  dispatchStartGame,
  dispatchEndGame,
} = require('./frontend-api/api')

const {
  width,
  height,
  frameRate,
  directions: {
    UP,
    DOWN,
    LEFT,
    RIGHT,
  },
} = require('./frontend-api/constants')

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Don't worry about anything above this line :D                               *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


/**
 * The snake is an array of body pieces which are located on the Game
 * each Game has one Snake
 */
class Snake {
  /**
   * Create a new snake
   *
   * Initializes the body to be at the center of the game board
   * Initializes this.body to be 5 items long vertically
   * Initializes this.direction
   * Binds move and changeDirection class methods to the Snake class
   *
   * @param int w the number of columns in the board
   * @param int h the number of rows in the board
   * @returns void
   */
  constructor(w, h) {
    if (!w || !h) {
      throw new Error("You're missing either height or width")
    }
    let head = { x: Math.floor(w / 2), y: Math.floor(h / 2) }
    this.body = []
    this.body.push(head) // create head
    for (let i = 1; i < 5; i++) {
      let piece = { x: head.x, y: (head.y + i) }
      this.body.push(piece) // initialize rest of snake body 
    }
    this.direction = UP
    this.move = this.move.bind(this)
    this.changeDirection = this.changeDirection.bind(this)
  }


  /**
   * Move the snake forwards in the proper direction
   *
   * @param Boolean grow: if the snake just ate food and thus should be
   *                      elongated by one square
   * @returns void
   */
  move(grow) {
    // try splitting the head attach side, use concat
    if (!grow) {
      this.body.pop()
    }
    let head = this.body[0];
    let attach = this.body;
    if (this.direction === UP) {
      let newHead = [{ x: head.x, y: head.y - 1 }]
      this.body = newHead.concat(attach)
    } else if (this.direction === DOWN) {
      let newHead = [{ x: head.x, y: head.y + 1 }]
      this.body = newHead.concat(attach)
    } else if (this.direction === RIGHT) {
      let newHead = [{ x: head.x + 1, y: head.y }]
      this.body = newHead.concat(attach)
    } else if (this.direction === LEFT) {
      let newHead = [{ x: head.x - 1, y: head.y }]
      this.body = newHead.concat(attach)
    }
  }


  /**
   * Change the direction of the snake
   *
   * If the passed in direction is not UP, DOWN, LEFT, or RIGHT (constants
   * which are defined above), throw an error.
   *
   * If the snake is moving in a certain direction and the user asks to move in
   * the opposite direction, do not update the direction. That is to say, the
   * snake can only make 90 degree turns.
   *
   * @param String direction
   * @returns void
   */
  changeDirection(direction) {
    const directions = [UP, DOWN, LEFT, RIGHT]
    // throws error if no direction provided
    if (!(directions.includes(direction))) {
      throw new Error('invalid direction')
    }
    if (direction === UP) {
      if (this.direction !== DOWN) {
        this.direction = direction
      }
    } else if (direction === DOWN) {
      if (this.direction !== UP) {
        this.direction = direction
      }
    } else if (direction === RIGHT) {
      if (this.direction !== LEFT) {
        this.direction = direction
      }
    } else if (direction === LEFT) {
      if (this.direction !== RIGHT) {
        this.direction = direction
      }
    }
  }
}


/**
 * Game class which has a snake and other game state
 */
class Game {
  /**
   * Constructor function to create a new game
   *
   *
   * @param int width
   * @param int height
   * @returns void
   */
  constructor(w, h, fr) {
    if (!w || !h) {
      throw new Error("You're missing either height or width")
    }

    this.width = w
    this.height = h
    this.playing = false
    this.snake = new Snake(w, h)
    this.keyPressed = false
    this.frameRate = fr

    this.updateGameState = this.updateGameState.bind(this)
    this.checkCollision = this.checkCollision.bind(this)
    this.spawnFood = this.spawnFood.bind(this)
    this.reset = this.reset.bind(this)
    this.startGame = this.startGame.bind(this)
    this.endGame = this.endGame.bind(this)
    this.spawnFood()
    dispatchChangeGameState(this.snake, this.food)
  }

  /**
   * Update this.food to be randomly placed in the game with proper x and y
   * locations. For simplicity, don't worry about when the food spawns where
   * the snake is.
   *
   * @param void
   * @returns void
   */
  spawnFood() {
    this.food = { x: Math.round(Math.random() * this.width), y: Math.round(Math.random() * this.height) }
  }

  /**
   * Check collisions that would end the game
   *
   * Namely, this is the case if the snake head hits one of the walls or if the
   * snake head hits any other piece of the snake body
   *
   * @param void
   * @returns boolean
   */
  checkCollision() {
    let head = this.snake.body[0]
    if (head.x < 0 || head.x > this.width - 1) {
      return true
    } else if (head.y < 0 || head.y > this.height - 1) {
      return true
    }
    for (let i = 1; i < this.snake.body.length; i++) {
      let item = this.snake.body[i]
      if (head.x === item.x && head.y === item.y) {
        return true
      }
    }
    return false
  }

  /**
   * Return if the snake is eating food right now
   *
   * If the snake is eating, spawn a new piece of food
   *
   * @param void
   * @returns true if snake head on food else false
   */
  shouldGrow() {
    let head = this.snake.body[0]
    if (head.x === this.food.x && head.y === this.food.y) {
      this.spawnFood()
      return true
    }
    return false
  }

  /**
   * Move the snake and update instance variables accordingly. Spawn new food
   * if the snake just grew. Also, check if there is now a collision.
   * Lastly, dispatch an action to change the game state.
   *
   * @param void
   * @returns void
   */
  updateGameState() {
    let grow = this.shouldGrow();
    this.snake.move(grow)
    this.keyPressed = false
    if (this.checkCollision()) {
      this.endGame()
    }
    dispatchChangeGameState(this.snake, this.food)
  }

  /**
   * Start the game and dispatch the corresponding action on the frontend
   *
   * @param void
   * @returns void
   */
  startGame() {
    dispatchStartGame()
    this.playing = true
    this.gameInterval = setInterval(this.updateGameState, frameRate)
  }

  /**
   * End the game and dispatch the corresponding action on the frontend
   *git
   * @param void
   * @returns void
   */
  endGame() {
    dispatchEndGame()
    clearInterval(this.gameInterval)
  }

  /**
   * Reset the game state such that a new game can be run only if the game is
   * currently playing
   *
   * @param void
   * @returns void
   */
  reset() {
    if (this.playing) {
      this.playing = false
      this.snake = new Snake(this.width, this.height)
      this.keyPressed = false
      clearInterval(this.gameInterval)
      this.spawnFood()
      dispatchChangeGameState(this.snake, this.food)
    }
  }
}

// Create a new game
const game = new Game(width, height, frameRate)

/**
 * Set up event listener for when the user presses a key
 * When the user presses 'r', restart the game
 * When the user presses ' ', start the game
 * If the user has changed their direction already once this clock tick, do
 * nothing, else check if the user pressed up, down, left, or right, and
 * change the snake direction accordingly
 *
 * @param event
 * @returns void
 */

function onKeyDownGenerator(game) {
  return function (event) {
    if (event.key === 'r') {
      game.reset()
      return
    }
    if (!game.playing) { // If the game has not yet started
      if (event.key === ' ') game.startGame()
      return
    }
    if (!game.keyPressed) {
      if (event.key === 'ArrowUp') {
        game.keyPressed = true
        game.snake.changeDirection(UP)
        return
      } else if (event.key === 'ArrowDown') {
        game.keyPressed = true
        game.snake.changeDirection(DOWN)
        return
      } else if (event.key === 'ArrowLeft') {
        game.keyPressed = true
        game.snake.changeDirection(LEFT)
        return
      } else if (event.key === 'ArrowRight') {
        game.keyPressed = true
        game.snake.changeDirection(RIGHT)
        return
      } else {
        return
      }
    }
  }
}

const reset = function reset() {
  game.reset()
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DONT WRITE CODE BELOW THIS LINE                                             *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

try {
  window.onKeyDown = onKeyDownGenerator(game)
  window.reset = reset
} catch (e) {
  global.onKeyDown = onKeyDownGenerator(game)
  global.reset = reset
}

module.exports = {
  Game,
  Snake,
  onKeyDownGenerator,
}
