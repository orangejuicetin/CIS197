/*eslint-env browser */
/*globals $ */

// The size of a swatch (in pixels)
var SWATCH_SIZE = 25;

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
      'sand-se-inverse'
    ].indexOf(swatchType) >= 0
  );
};

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
  this.builder = builder;
  this.$map = builder.$elem.find('.map');

  this.$player = $('<div>').addClass('player facing-down');
  this.$player.css('left', x * SWATCH_SIZE + 'px');
  this.$player.css('top', y * SWATCH_SIZE + 'px');
  this.$map.append(this.$player);

  //changes image of player, calls move
  $(document).keydown(
    function(e) {
      if (e.which == 37 || e.which == 38 || e.which == 39 || e.which == 40) {
        this.$player.removeClass(this.$player.get(0).classList[1]);
        if (e.which == 37) {
          this.$player.addClass('facing-left');
        } else if (e.which == 38) {
          this.$player.addClass('facing-up');
        } else if (e.which == 39) {
          this.$player.addClass('facing-right');
        } else {
          this.$player.addClass('facing-down');
        }
        move(e.which);
      }
    }.bind(this)
  );

  var self = this;
  var move = function(direction) {
    var curr;
    if (direction == 37) {
      // left
      curr = self.$map
        .find('div')
        .eq(y * (builder.width + 1) + x)
        .get(0).classList[2];
      if (x - 1 <= 0 || !isTerrain(curr)) {
        return;
      }
      self.x = x--;
      self.$player.css('left', x * SWATCH_SIZE + 'px');
    } else if (direction == 38) {
      // up
      curr = self.$map
        .find('div')
        .eq((y - 1) * (builder.width + 1) + x + 1)
        .get(0).classList[2];
      if (y - 1 <= 0 || !isTerrain(curr)) {
        return;
      }
      self.y = y--;
      self.$player.css('top', y * SWATCH_SIZE + 'px');
    } else if (direction == 39) {
      // right
      curr = self.$map
        .find('div')
        .eq(y * (builder.width + 1) + x + 2)
        .get(0).classList[2];
      if (x + 1 >= builder.width || !isTerrain(curr)) {
        return;
      }
      self.x = x++;
      self.$player.css('right', x * SWATCH_SIZE + 'px');
    } else {
      // down
      if (y + 1 >= builder.height) {
        return;
      } else {
        curr = self.$map
          .find('div')
          .eq((y + 1) * (builder.width + 1) + x + 2)
          .get(0).classList[2];
        if (!isTerrain(curr)) {
          return;
        }
      }
      self.y = y++;
      self.$player.css('down', x * SWATCH_SIZE + 'px');
    }
  };
};
