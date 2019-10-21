// CIS 197 - React HW
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { mainReducer as reducers } from './reducers'
import GameOfLife from './components/GameOfLife'
import * as initialState from './initialState'
import * as timer from './timer'

const store = createStore(reducers, initialState)

if (!store) {
  throw new Error('Issue creating app store')
}

timer.setStore(store)

const gameOfLifeComponent = <GameOfLife store={store} />
const container = document.getElementById('container')

if (!container) {
  throw new Error('There must be a node in the HTML with ID "container"')
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(gameOfLifeComponent, container)
})
