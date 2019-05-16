import React, { Component } from "react";
import { Link } from "react-router-dom";
import NumericInput from 'react-numeric-input';
import "./ControlsBar.css";

export default class ControlsBar extends Component {
  render() {
    let playButton = (
      <button className="play-btn" onClick={() => this.props.play()}>
        Play
      </button>
    );
    if (this.props.isPlaying) {
      playButton = (
        <button className="stop-btn" onClick={() => this.props.stop()}>
          Stop
        </button>
      );
    }

    if (this.props.user) {
      return (
        <div id="controls-bar">
            <div id="tempo-wrapper">
            <NumericInput
              min={70}
              max={160}
              step={1}
              value={this.props.tempo}
              format={num => 'BPM: ' + num}
              parse={strValue => strValue.replace('BPM: ', "")}
              onChange={newTempo => this.props.updateSongTempo(newTempo)}
            />
            </div>
          <div id="navigation">
            <Link to="/creator">
              <button>CREATION MODE</button>
            </Link>
            <Link to="/visualizer">
              <button>VISUALIZATION MODE</button>
            </Link>
          </div>
          <div id="song-controls">
            {playButton}
            <button onClick={() => this.props.newSong()}>NEW</button>
            <Link to="/load"><button>LOAD</button></Link>
            <Link to="/save"><button>SAVE</button></Link>
          </div>
          <div id="auth-controls">
            <button onClick={() => this.props.logout()}>LOGOUT</button>
          </div>
        </div>
      );
    } else {
      return <div id="controls-bar"></div>
    }
  }
}
