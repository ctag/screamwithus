import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import buttonImg from './Button3.png';
import buttonImg2 from './Button4.png';
import './App.css';

const sayings = [
  'You scream! I scream! Icecream?',
  'The server screamed this packet through the Internet to you',
  'Cave Johnson approved!',
  'Screaming is great and all, but have you tried howling at the Moon?',
  'Louder!',
]

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonPressed: false,
      activeUserCount: 0,
    }
    this.tallyPhrases = [
      'Nobody Is Screaming With Us',
      '1 Person Is Screaming With Us',
      ' People Are Screaming With Us',
    ]
    this.socket = openSocket()
    this.socket.on('activeUserCount', (count) => {
      this.setState({activeUserCount: count})
    })
  }

  ButtonPressed = () => {
    console.log('Button pressed!')
    this.socket.emit('button pressed')
    this.setState({buttonPressed: true})
  }

  ButtonReleased = () => {
    console.log('Button released!')
    this.socket.emit('button released')
    this.setState({buttonPressed: false})
  }

  printTallyPhrases = () => {
    console.log('phrase: ', this.state.activeUserCount)
    if (this.state.activeUserCount > 1) {
      return `${this.state.activeUserCount}${this.tallyPhrases[2]}`
    }
    return this.tallyPhrases[this.state.activeUserCount]
  }

  render() {
    return (
      <div className="App noselect">
        <header className="App-header">
          <p>
            {this.printTallyPhrases()}
          </p>
          <div onMouseDown={this.ButtonPressed} onMouseUp={this.ButtonReleased}>
            <img src={this.state.buttonPressed ? buttonImg2 : buttonImg} className="App-logo noselect" draggable="false" alt="logo" />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
