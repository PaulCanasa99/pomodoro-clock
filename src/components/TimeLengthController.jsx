import React, { Component } from 'react';
import './Styles.css';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
class TimeLengthController extends Component {
  state = {};
  render() {
    return (
      <div className="timer-element" id={this.props.id}>
        {this.props.id === 'break-label' ? 'Break Length' : 'Session Length'}
        <br />
        <RemoveIcon
          id={
            this.props.id === 'break-label'
              ? 'break-decrement'
              : 'session-decrement'
          }
          onClick={this.props.handleDec}
        />
        <div
          id={
            this.props.id === 'break-label' ? 'break-length' : 'session-length'
          }
          className="length"
        >
          {this.props.time}
        </div>
        <AddIcon
          id={
            this.props.id === 'break-label'
              ? 'break-increment'
              : 'session-increment'
          }
          onClick={this.props.handleInc}
        />
      </div>
    );
  }
}

export default TimeLengthController;
