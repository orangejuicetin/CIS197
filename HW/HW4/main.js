/*eslint no-unused-vars: 0 */
/*eslint-env browser */
/*globals $, MapBuilder, Player */

$(document).ready(function() {
  var $mapElement = $('#map-builder')
  var builder = new MapBuilder($mapElement)
  builder.setupPalette()
  builder.setupMapCanvas()
  var pikachu = new Player(0, 0, builder)
})
