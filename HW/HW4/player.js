/*eslint-env browser */
/*globals $ */

// The size of a swatch (in pixels)
var SWATCH_SIZE = 25

// Utility function - checks if a given swatch name is walkable terrain.
var isTerrain = function(swatchType) {
  return (
    [
      'grass',
      'flowers-red',
      'flowers-orange',
      'flowers-blue',
      'weed',
      'weed-4x',
      'weed-small',
      'weed-2x',
      'field',
      'sand-patch',
      'sand',
      'sand-nw',
      'sand-n',
      'sand-ne',
      'sand-w',
      'sand-e',
      'sand-sw',
      'sand-s',
      'sand-se',
      'sand-nw-inverse',
      'sand-ne-inverse',
      'sand-sw-inverse',
      'sand-se-inverse',
    ].indexOf(swatchType) >= 0
  )
}

/*
 * Constructor for the player (Pikachu sprite).
 *
 * @param x - The beginning x coordinate (usually zero)
 * @param y - The beginning y coordinate (usually zero)
 * @param builder - The MapBuilder object, with information about the map.
 * In particular, this builder object should have the container element
 * as a property so the '.map' div can be found using a jQuery 'find' call.
 */
var Player = function(x, y, builder) {
  this.builder = builder
  this.$map = builder.$elem.find('.map')

  // TODO: Initialize the player class. You'll need to
  // 1. Create an element for the player and add it to the DOM, with a class
  //    specifying orientation. The classes are 'facing-{up, down, left, right}.'
  // 2. Listen to *keydown* events *on the document* to move the player.
  //    Keycodes for [left, up, right, down] are [37, 38, 39, 40], respectively.
  // 3. Change the player position and orientation based on key presses.

  // You are highly encouraged to implement helper methods. See the class
  // website for more details.

}
