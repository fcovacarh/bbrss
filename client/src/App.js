import React from "react";
import "./App.css";
import Song from "./classes/Song.class.js";
import SynthComponent from "./components/SynthComponent";

export default class App extends React.Component {
  state = {
    song: new Song()
  };

  addNewBasicSynth() {
    const newSong = { ...this.state.song};
    newSong.instruments = this.state.song.addBasicSynth(this.state.song.instruments.length);
    this.setState({
      ...this.state,
      song: newSong
    });
  }

  updateSynth(idx, props) {
    const newSong = { ...this.state.song };
    newSong.instruments = this.state.song.updateSynth(idx, props);
    this.setState({
      ...this.state,
      song: newSong
    });
  }

  updateSynthSequence(idx, notes) {
    this.state.song.updateSynthSequence(idx, notes);
  }

  activateSynth(idx) {
    this.state.song.activateSynth(idx);
  }

  play() {
    this.state.song.play();
  }

  stop() {
    this.state.song.stop();
  }

  render() {
    const synths = this.state.song.getSynths();
    return (
      <div className="App">
        <button onClick={() => this.addNewBasicSynth()}>Add Basic Synth</button>
        <button onClick={() => this.play()}>Play</button>
        <button onClick={() => this.stop()}>Stop</button>
        <div className="synth-rack">
          {synths.map((synth, idx) => (
            <SynthComponent
              key={idx}
              idx={idx}
              {...synth.synth}
              updateSynth={(idx, props) => this.updateSynth(idx, props)}
              updateSynthSequence={(idx, notes) => this.updateSynthSequence(idx, notes)}
              activateSynth={() => this.activateSynth(idx)}
            />
          ))}
        </div>
      </div>
    );
  }
}
