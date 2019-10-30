"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireDefault(require("react"));

var _Cell = _interopRequireDefault(require("./Cell"));

var initialState = _interopRequireWildcard(require("../initialState.js"));

var actions = _interopRequireWildcard(require("../actions/index.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var GameOfLife =
/*#__PURE__*/
function (_React$Component) {
  _inherits(GameOfLife, _React$Component);

  // Here we subscribe to changes in the store data and update
  // the React component's state by using `store.getState()`.
  // Technically this is non-standard architecture, but we need to
  // organize things this way for the sake of the game's performance.
  // NOTE: further down in the render function, you will need to
  //       access this.state.cells and this.state.x and this.state.y.
  //       For these attributes, be sure to use this.state and not this.props
  function GameOfLife() {
    var _this;

    _classCallCheck(this, GameOfLife);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GameOfLife).call(this));
    _this.state = initialState;
    _this.onImportSeed = _this.onImportSeed.bind(_assertThisInitialized(_this));
    _this.onRun = _this.onRun.bind(_assertThisInitialized(_this));
    _this.onStep = _this.onStep.bind(_assertThisInitialized(_this));
    _this.onStop = _this.onStop.bind(_assertThisInitialized(_this));
    _this.onClear = _this.onClear.bind(_assertThisInitialized(_this));
    _this.onExportMap = _this.onExportMap.bind(_assertThisInitialized(_this));
    _this.onRandomSeed = _this.onRandomSeed.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(GameOfLife, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var store = this.props.store;
      store.subscribe(function () {
        this.setState(store.getState());
      }.bind(this));
    }
  }, {
    key: "onImportSeed",
    value: function onImportSeed(seedName) {
      var store = this.props.store;
      store.dispatch(actions.importSeed(seedName));
    } // TODO: here you'll want to implement the functions that get called
    //       when various actions (such as button clicks) occur in thie view.
    //       These functions should, like onImportSeed above, dispatch the
    //       appropriate actions using the Redux store prop.

  }, {
    key: "onRun",
    value: function onRun() {
      var store = this.props.store;
      store.dispatch(actions.run());
    }
  }, {
    key: "onStep",
    value: function onStep() {
      var store = this.props.store;
      store.dispatch(actions.step());
    }
  }, {
    key: "onStop",
    value: function onStop() {
      var store = this.props.store;
      store.dispatch(actions.stop());
    }
  }, {
    key: "onClear",
    value: function onClear() {
      var store = this.props.store;
      store.dispatch(actions.clear());
    }
  }, {
    key: "onExportMap",
    value: function onExportMap() {
      var store = this.props.store;
      store.dispatch(actions.exportMap());
    }
  }, {
    key: "onRandomSeed",
    value: function onRandomSeed() {
      var store = this.props.store;
      store.dispatch(actions.randomSeed());
    } // TODO: Generate the following HTML structure:
    // <div class="game-component">
    //   <div class="board-component" style="width=900px">
    //     <span class="cell-widget cell"></span>
    //     <span class="cell-widget cell"></span>
    //     <span class="cell-widget cell alive "></span>
    //      ...remaining cells
    //   </div>
    //   <div class="controls">
    //     <h4>Controls</h4>
    //     <button>run</button>
    //     <button>step</button>
    //     <button>stop</button>
    //     <button>clear</button>
    //     <button>export map</button>
    //   </div>
    //   <div class="seeds">
    //     <button>glider</button>
    //     <button>glider gun</button>
    //     <button>acorn</button>
    //     <button>line</button>
    //     <button>random</button>
    //   </div>
    // </div>
    //
    // HINT: Use the `onClick` prop on your buttons to register click callbacks!
    // NOTE: Please make sure your button text matches the button text above,
    //       as this is necessary for the test suite.
    //       (e.g. your 'step' button should have button text 'step',
    //        and your 'glider gun' button should have button text 'glider gun')
    // HINT: Remember to pass the store as a prop of each <Cell> component
    // HINT: Remember that the application state's `x`, `y`, and `cells` values
    //       are located in this.state and not this.props.

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      console.log(this.state);
      return _react["default"].createElement("div", {
        className: "game-component"
      }, _react["default"].createElement("div", {
        className: "board-component",
        style: {
          width: this.state.x * 12
        }
      }, this.state.cells.map(function (e, i) {
        return _react["default"].createElement(_Cell["default"], {
          store: _this2.props.store,
          index: i,
          alive: e
        });
      })), _react["default"].createElement("div", {
        className: "controls"
      }, _react["default"].createElement("h4", null, "Controls"), _react["default"].createElement("button", {
        onClick: this.onRun
      }, "run"), _react["default"].createElement("button", {
        onClick: this.onStep
      }, "step"), _react["default"].createElement("button", {
        onClick: this.onStop
      }, "stop"), _react["default"].createElement("button", {
        onClick: this.onClear
      }, "clear"), _react["default"].createElement("button", {
        onClick: this.onExportMap
      }, "export map")), _react["default"].createElement("div", {
        className: "seeds"
      }, _react["default"].createElement("button", {
        onClick: function onClick() {
          return _this2.onImportSeed('GLIDER');
        }
      }, "glider"), _react["default"].createElement("button", {
        onClick: function onClick() {
          return _this2.onImportSeed('GLIDER_GUN');
        }
      }, "glider gun"), _react["default"].createElement("button", {
        onClick: function onClick() {
          return _this2.onImportSeed('ACORN');
        }
      }, "acorn"), _react["default"].createElement("button", {
        onClick: function onClick() {
          return _this2.onImportSeed('LINE');
        }
      }, "line"), _react["default"].createElement("button", {
        onClick: this.onRandomSeed
      }, "random")));
    }
  }]);

  return GameOfLife;
}(_react["default"].Component);

exports["default"] = GameOfLife;