// CIS 197 - React HW

import React from 'react';
import * as actions from '../actions/index.js';

export default class Cell extends React.Component {
  constructor() {
    super();
    this.onCellClick = this.onCellClick.bind(this);
  }

  onCellClick() {
    const { store } = this.props;
    store.dispatch(actions.cellClicked(this.props.index));
  }

  render() {
    // TODO: complete the render function.
    //       A non-living cell has the HTML structure
    //       <span class="cell-component cell"></span>
    //       while a living cell has the HTML structure
    //       <span class="cell-component cell alive"></span>
    // HINT: don't forget to implement the click handler
    //       whose execution dispatches a CELL_CLICKED event.
    if (this.props.alive) {
      return (
        <span
          onClick={() => this.onCellClick(this.props.index)}
          className='cell-component cell alive'
        ></span>
      );
    } else {
      return (
        <span
          onClick={() => this.onCellClick(this.props.index)}
          className='cell-component cell'
        ></span>
      );
    }
  }
}

Cell.defaultProps = {
  alive: false,
  key: 0,
  index: 0
};
