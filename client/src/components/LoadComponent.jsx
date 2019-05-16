import React, { Component } from "react";
import './LoadComponent.css';

export default class LoadComponent extends Component {
  render() {
    const songs = this.props.userSongs;
    return (
      <div id="load-screen">
        {songs.map(song => {
          return (
            <div className="song-item">
              <h3>{song.name}</h3>
              <button onClick={() => this.props.loadSongData(song)}>LOAD</button>
            </div>
          );
        })}
      </div>
    );
  }
}
