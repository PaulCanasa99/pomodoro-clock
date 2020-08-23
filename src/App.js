import React, { Component } from 'react';
import './App.css';
import PomodoroClock from './components/PomodoroClock';
class App extends Component {
  render() {
    return (
      <div className="App">
        Pomodoro Clock
        <PomodoroClock />
      </div>
    );
  }
}

export default App;
