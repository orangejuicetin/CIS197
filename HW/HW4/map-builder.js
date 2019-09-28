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
  this.$palette = this.$elem.find('.palette');
  var self = this;
  this.$palette.click(function(e) {
    $('.selected').removeClass('selected');
    self.$curr = e.target;
    $(self.$curr).addClass('selected');
    self.selectedSwatchName = getSwatchName(self.$curr, 1);
  });
};

// var getFullSwatchName = function(input) {
//   // takes full class name of event target
//   return input.classList.value;
// };

var getSwatchName = function(input, index) {
  // takes part of the class name of event target
  return input.classList[index];
};

// TODO: Implement MapBuilder.setupMapCanvas
MapBuilder.prototype.setupMapCanvas = function() {
  MapBuilder.prototype.$map = this.$elem.find('.map');
  var self = this;

  function onMouseEnter(e) {
    // for handling mouse hovers
    var $this = e.target;
    var currName = getSwatchName($this, $this.classList.length - 1);
    $($this).attr('data-appearance', currName);
    if (self.selectedSwatchName !== undefined) {
      $($this).attr('class', 'tile swatch' + ' ' + self.selectedSwatchName);
    }
    if (e.which === 1) {
      onMouseDown(e);
    }
  }

  function onMouseDown(e) {
    // if left button is pressed
    var $this = e.target;
    if (self.selectedSwatchName !== undefined) {
      $($this).attr('data-appearance', self.selectedSwatchName);
      $($this).attr('class', 'tile swatch' + ' ' + self.selectedSwatchName);
    }
  }

  function onMouseOut(e) {
    // when the mouse leaves
    var $this = e.target;
    $($this).attr('class', 'tile swatch' + ' ' + $($this).data('appearance'));
  }

  for (var i = 0; i < this.height; i++) {
    var $newRow = $("<div class='row'></div>");
    for (var j = 0; j < this.width; j++) {
      var $grassSwatch = $("<div class='tile swatch grass'></div>");
      $($grassSwatch).on('mouseenter', onMouseEnter);
      $($grassSwatch).on('mousedown', onMouseDown);
      $($grassSwatch).on('mouseout', onMouseOut);
      $($newRow).append($grassSwatch);
    }
    $(this.$map).append($newRow);
  }
  console.log(this.$map);
};
