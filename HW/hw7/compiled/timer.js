"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setStore = exports.stop = exports.run = void 0;

var actions = _interopRequireWildcard(require("./actions"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var interval = null;
var store = null;
/**
 * Run the app by setting the interval if there is one
 */

var run = function run() {
  if (!interval) {
    interval = setInterval(function () {
      store.dispatch(actions.step());
    }, 1);
  }
};
/**
 * If an interval exists, clear the interval and set it to null
 */


exports.run = run;

var stop = function stop() {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
};
/**
 * Setter method for the Redux store of the app
 *
 * @param {Store} s
 */


exports.stop = stop;

var setStore = function setStore(s) {
  store = s;
};

exports.setStore = setStore;