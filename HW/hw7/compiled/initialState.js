"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cells = exports.y = exports.x = void 0;
var x = 48;
exports.x = x;
var y = 36; // Create an array of dimensions x by y filled with false

exports.y = y;
var cells = Array.apply(null, Array(x * y)).map(function () {
  return false;
});
exports.cells = cells;