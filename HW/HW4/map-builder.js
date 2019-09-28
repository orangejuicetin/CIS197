/*eslint-env browser */
/*globals $ */

// Default size of map (in tiles)
var DEFAULT_WIDTH = 30;
var DEFAULT_HEIGHT = 15;

var MapBuilder = function($container, params) {
  MapBuilder.prototype.$elem = $container;
  if (params) {
    this.width = params.width;
    this.height = params.height;
  } else {
    this.width = DEFAULT_WIDTH;
    this.height = DEFAULT_HEIGHT;
  }
};

// TODO: Implement MapBuilder.setupPalette()
MapBuilder.prototype.setupPalette = function() {
  MapBuilder.prototype.$palette = this.$elem.find('.palette');
  this.$palette.click(function(e) {
    $('.selected').removeClass('selected');
    this.$curr = e.target;
    $(this.$curr).addClass('selected');
    this.swatchName = getSwatchName(this.$curr);
  });
};

var getSwatchName = function(input) {
  // takes class name of event target
  return input.classList.value;
};

// TODO: Implement MapBuilder.setupMapCanvas
MapBuilder.prototype.setupMapCanvas = function() {
  MapBuilder.prototype.$map = this.$elem.find('.map');
};
