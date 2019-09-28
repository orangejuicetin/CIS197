/*eslint-env browser */
/*globals $ */

// Default size of map (in tiles)
var DEFAULT_WIDTH = 30;
var DEFAULT_HEIGHT = 15;

var MapBuilder = function ($container, params) {
  MapBuilder.prototype.$elem = $container;
  if (params) {
    this.width = params.width;
    this.height = params.height;
  } else {
    this.width = DEFAULT_WIDTH; ``
    this.height = DEFAULT_HEIGHT;
  }
};

// TODO: Implement MapBuilder.setupPalette()
MapBuilder.prototype.setupPalette = function () {
  MapBuilder.prototype.$palette = this.$elem.find('.palette');
  console.log(this.$palette)
  this.$palette.click(function (event) {
    console.log(event)
    MapBuilder.prototype.$selected = event.toElement;
    console.log(this.$selected);
    this.swatchName = getSwatchName(event);
    console.log(this.swatchName)
    this.$selected.addClass("selected");
    console.log($selected.attr('class'));
  })
};

var getSwatchName = function (event) {
  return event.target.classList.value;
}
// TODO: Implement MapBuilder.setupMapCanvas
MapBuilder.prototype.setupMapCanvas = function () {
  console.log('working');
}

