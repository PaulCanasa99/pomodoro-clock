import React, { Component } from 'react';
import TimeLengthController from './TimeLengthController';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
const getTime = function (time) {
  let min = Math.floor(time / 60);
  let seg = time % 60;
  if (min < 10) min = '0' + min;
  if (seg < 10) seg = '0' + seg;
  return min + ':' + seg;
};
class PomodoroClock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      clockTime: 1500,
      clockType: 'Session',
      sessionTime: 25,
      breakTime: 5,
      intervalID: '',
    };
  }
  handleSessionInc = () => {
    if (!this.state.running && this.state.sessionTime !== 60) {
      this.setState({
        sessionTime: this.state.sessionTime + 1,
      });
      if (this.state.clockType === 'Session') {
        this.setState({ clockTime: this.state.sessionTime * 60 + 60 });
      }
    }
  };
  handleSessionDec = () => {
    if (!this.state.running && this.state.sessionTime !== 1) {
      this.setState({
        sessionTime: this.state.sessionTime - 1,
      });
      if (this.state.clockType === 'Session') {
        this.setState({ clockTime: this.state.sessionTime * 60 - 60 });
      }
    }
  };
  handleBreakInc = () => {
    if (!this.state.running && this.state.breakTime !== 60) {
      this.setState({
        breakTime: this.state.breakTime + 1,
      });
      if (this.state.clockType === 'Break') {
        this.setState({ clockTime: this.state.breakTime * 60 + 60 });
      }
    }
  };
  handleBreakDec = () => {
    if (!this.state.running && this.state.breakTime !== 1) {
      this.setState({
        breakTime: this.state.breakTime - 1,
      });
      if (this.state.clockType === 'Break') {
        this.setState({ clockTime: this.state.breakTime * 60 - 60 });
      }
    }
  };

  handlePlayPause = () => {
    if (!this.state.running) {
      this.beginCountDown();
    } else {
      this.setState({ running: false });
      clearInterval(this.state.intervalID);
    }
  };
  beginCountDown = () => {
    this.setState({
      intervalID: setInterval(() => {
        this.decrementTimer();
        this.phaseControl();
      }, 1000),
      running: true,
    });
  };
  decrementTimer = () => {
    this.setState({ clockTime: this.state.clockTime - 1 });
  };
  phaseControl = () => {
    let timer = this.state.clockTime;
    this.buzzer(timer);
    if (timer < 0) {
      if (this.state.clockType === 'Session') {
        clearInterval(this.state.intervalID);
        this.beginCountDown();
        this.switchTimer(this.state.breakTime * 60, 'Break');
      } else {
        clearInterval(this.state.intervalID);
        this.beginCountDown();
        this.switchTimer(this.state.sessionTime * 60, 'Session');
      }
    }
  };
  switchTimer = (num, str) => {
    this.setState({
      clockTime: num,
      clockType: str,
    });
  };

  handleReset = () => {
    this.setState({
      running: false,
      clockTime: 1500,
      clockType: 'Session',
      sessionTime: 25,
      breakTime: 5,
      intervalID: '',
    });
    this.state.intervalID && clearInterval(this.state.intervalID);
  };
  buzzer(_timer) {
    if (_timer === 0) {
      this.audioBeep.play();
    }
  }
  render() {
    return (
      <div className="pomodoro">
        <TimeLengthController
          id="break-label"
          time={this.state.breakTime}
          handleDec={this.handleBreakDec}
          handleInc={this.handleBreakInc}
        />
        <TimeLengthController
          id="session-label"
          time={this.state.sessionTime}
          handleDec={this.handleSessionDec}
          handleInc={this.handleSessionInc}
        />
        <div className="clock">
          <div id="time-left"> {getTime(this.state.clockTime)}</div>
          <div className="type" id="timer-label">
            {this.state.clockType}
          </div>
        </div>
        <div className="buttons">
          <div id="start_stop" onClick={this.handlePlayPause}>
            <PlayArrowIcon id="start" />
            <PauseIcon id="stop" />
          </div>
          <RotateLeftIcon id="reset" onClick={this.handleReset} />
        </div>
        <audio
          id="beep"
          preload="auto"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          ref={(audio) => {
            this.audioBeep = audio;
          }}
        />
      </div>
    );
  }
}

export default PomodoroClock;
