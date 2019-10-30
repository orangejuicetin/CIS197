"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cellClicked = exports.exportMap = exports.randomSeed = exports.clear = exports.stop = exports.importSeed = exports.step = exports.run = void 0;
var seeds = {
  ACORN: require('../seeds/acorn.json').data,
  GLIDER: require('../seeds/glider.json').data,
  GLIDER_GUN: require('../seeds/glider_gun.json').data,
  LINE: require('../seeds/line.json').data
}; // When a run action is dispatched, this signals to the
// application that the isRunning state should be set to true
// (and hence to start the animation (which is really just a series
//  of STEP actions separated by a few hundred milliseconds!))

var run = function run() {
  return {
    type: 'RUN'
  };
}; // This event type signals the simulation to move forward
// one step in time; that is, to compute from the current cell
// matrix the subsequent cell matrix, and then to render the new
// matrix on the grid.


exports.run = run;

var step = function step() {
  return {
    type: 'STEP'
  };
}; // The importSeed action is used to signal the event that the user
// has chosen a pre-built seed from the UI with a particular name.
// Hence, in the reducer, when we receive an IMPORT_SEED action,
// it has attached to it the new cell matrix data in an attribute
// called 'seed', and subsequently updates the current matrix
// to reflect the imported seed data.
//
// TODO: Complete the importSeed action function by returning
//       and object with type 'IMPORT_SEED' and attribute
//       'seed' the maps to the seed data of the given seedName.


exports.step = step;

var importSeed = function importSeed(seedName) {
  return {
    type: 'IMPORT_SEED',
    seed: seeds[seedName]
  };
}; // ...
// Now, we want to implement action functions for stop, clear,
// randomSeed, export, and cellClicked.
//
// stop - this action signals the app to stop the animation
// clear - this action signals the app to clear the current cell matrix
// randomSeed - this action signals the app to construct a random cell matrix
// export - this action signals the app to export the matrix data to JSON
// cellClicked - this action signals to the app that a cell
//               *with a particular index* has been clicked.
//               Unlike the other actions, this action is triggered
//               from the Cell.jsx component, and registered for dispatch
//               in the Redux container component called CellContainer.
//
// // TODO: Implement the action functions for events of the following
//       types (corresponding to the action functions called from
//       GameContainer's mapDispatchToProps):
//       'STOP', 'CLEAR', 'RANDOM_SEED', 'EXPORT_MAP', 'CELL_CLICKED'


exports.importSeed = importSeed;

var stop = function stop() {
  return {
    type: 'STOP'
  };
};

exports.stop = stop;

var clear = function clear() {
  return {
    type: 'CLEAR'
  };
};

exports.clear = clear;

var randomSeed = function randomSeed() {
  return {
    type: 'RANDOM_SEED'
  };
};

exports.randomSeed = randomSeed;

var exportMap = function exportMap() {
  return {
    type: 'EXPORT_MAP'
  };
};

exports.exportMap = exportMap;

var cellClicked = function cellClicked(index) {
  return {
    type: 'CELL_CLICKED',
    index: index
  };
};

exports.cellClicked = cellClicked;