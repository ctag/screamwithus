import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import buttonImg from './button.gif';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeUserCount: 0,
    }
    this.socket = openSocket()
    this.socket.on('activeUserCount', (count) => {
      this.setState({activeUserCount: count})
    })
  }

  ButtonPressed = () => {
    console.log('Button pressed!')
    this.socket.emit('button pressed')
  }

  ButtonReleased = () => {
    console.log('Button released!')
    this.socket.emit('button released')
  }

  render() {
    return (
      <div className="App" onMouseDown={this.ButtonPressed} onMouseUp={this.ButtonReleased}>
        <header className="App-header">
          <img src={buttonImg} className="App-logo" alt="logo" />
          <p>
            Screamers: {this.state.activeUserCount}
          </p>
        </header>
      </div>
    );
  }
}

export default App;
