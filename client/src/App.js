import React from "react";
import "./App.css";
import Song from "./classes/Song.class.js";
import SynthComponent from "./components/SynthComponent";
import DrumSamplerComponent from "./components/DrumSamplerComponent";
import VisualizerComponent from "./components/VisualizerComponent";

export default class App extends React.Component {
  state = {
    song: new Song()
  };

  //SYNTHS
  addNewBasicSynth() {
    const newSong = { ...this.state.song };
    newSong.instruments = this.state.song.addBasicSynth(
      this.state.song.instruments.length
    );
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

  //SAMPLER
  addNewSampler() {
    const newSong = { ...this.state.song };
    newSong.instruments = this.state.song.addSampler(
      this.state.song.instruments.length
    );
    this.setState({
      ...this.state,
      song: newSong
    });
  }

  updateSampler(idx, style) {
    const newSong = { ...this.state.song };
    newSong.instruments = this.state.song.updateSampler(idx, style);
    this.setState({
      ...this.state,
      song: newSong
    });
  }

  updateSamplerSequence(idx, notes) {
    this.state.song.updateSamplerSequence(idx, notes);
  }

  activateSampler(idx) {
    this.state.song.activateSampler(idx);
  }

  play() {
    this.state.song.play();
  }

  stop() {
    this.state.song.stop();
  }

  render() {
    const synths = this.state.song.getSynths();
    const samplers = this.state.song.getSamplers();
    return (
      <div className="App">
        <button onClick={() => this.addNewBasicSynth()}>Add Basic Synth</button>
        <button onClick={() => this.addNewSampler()}>Add Sampler</button>
        <button onClick={() => this.play()}>Play</button>
        <button onClick={() => this.stop()}>Stop</button>
        <div className="synth-rack">
          {synths.map((synth, idx) => (
            <SynthComponent
              key={idx}
              idx={idx}
              {...synth.instrument}
              updateSynth={(idx, props) => this.updateSynth(idx, props)}
              updateSynthSequence={(idx, notes) =>
                this.updateSynthSequence(idx, notes)
              }
              activateSynth={() => this.activateSynth(idx)}
            />
          ))}
        </div>
        <div className="samplers-rack">
          {samplers.map((sampler, idx) => (
            <DrumSamplerComponent
              key={idx}
              idx={idx}
              {...sampler}
              updateSampler={(idx, style) => this.updateSampler(idx, style)}
              updateSamplerSequence={(idx, notes) =>
                this.updateSamplerSequence(idx, notes)
              }
              activateSampler={() => this.activateSampler(idx)}
            />
          ))}
        </div>
      </div>
    );
  }
}
