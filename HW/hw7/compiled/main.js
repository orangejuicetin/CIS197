"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _redux = require("redux");

var _reducers = require("./reducers");

var _GameOfLife = _interopRequireDefault(require("./components/GameOfLife"));

var initialState = _interopRequireWildcard(require("./initialState"));

var timer = _interopRequireWildcard(require("./timer"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// CIS 197 - React HW
var store = (0, _redux.createStore)(_reducers.mainReducer, initialState);

if (!store) {
  throw new Error('Issue creating app store');
}

timer.setStore(store);

var gameOfLifeComponent = _react["default"].createElement(_GameOfLife["default"], {
  store: store
});

var container = document.getElementById('container');

if (!container) {
  throw new Error('There must be a node in the HTML with ID "container"');
}

document.addEventListener('DOMContentLoaded', function () {
  _reactDom["default"].render(gameOfLifeComponent, container);
});