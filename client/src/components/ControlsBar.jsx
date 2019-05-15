import React, { Component } from "react";
import {Link} from "react-router-dom";
import './ControlsBar.css';


export default class ControlsBar extends Component {
  render() {
    let playButton = <button className="play-btn" onClick={() => this.props.play()}>Play</button>;
    if (this.props.isPlaying) {
      playButton = <button className="stop-btn" onClick={() => this.props.stop()}>Stop</button>;
    }
    return (
      <div id="controls-bar">
        <div>
          <label>{this.props.tempo}</label>
          <input
            type="range"
            min="70"
            max="160"
            value={this.props.tempo}
            onChange={newTempo => this.props.updateSongTempo(newTempo)}
          />
        </div>
        <div id="navigation">
          <Link to="/creator"><button>CREATION MODE</button></Link>
          <Link to="/visualizer"><button>VISUALIZATION MODE</button></Link>
        </div>
        {playButton}
      </div>
    );
  }
}
