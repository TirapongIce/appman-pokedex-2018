
import React, { Component } from 'react'
import './App.css'
import PokedexList from './pages/PokedexList'


class App extends Component {
  render() {
    return (
      <div className="App">
        <PokedexList />
      </div>
    )
  }
}

export default App