import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Song from "./classes/Song.class.js";
import SynthComponent from "./components/SynthComponent";
import DrumSamplerComponent from "./components/DrumSamplerComponent";
import ControlsBar from "./components/ControlsBar";
import VisualizerComponent from "./components/VisualizerComponent";

export default class App extends React.Component {
  state = {
    song: new Song(),
    tempo: 130,
    isPlaying: false
  };

  //SONG
  updateSongtempo(newTempo) {
    const tempo = newTempo.target.value;
    this.state.song.updateTempo(tempo);
    this.setState({
      ...this.state,
      tempo: tempo
    });
  }

  play() {
    this.state.song.play();
    this.setState({
      ...this.state,
      isPlaying: true
    });
  }

  stop() {
    this.state.song.stop();
    this.setState({
      ...this.state,
      isPlaying: false
    });
  }

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

  renderSynthsSection() {
    const synths = this.state.song.getSynths();
    return synths.map((synth, idx) => (
      <SynthComponent
        key={idx}
        idx={idx}
        {...synth.instrument}
        notes={synth.notes}
        active={synth.active}
        updateSynth={(idx, props) => this.updateSynth(idx, props)}
        updateSynthSequence={(idx, notes) =>
          this.updateSynthSequence(idx, notes)
        }
        activateSynth={() => this.activateSynth(idx)}
      />
    ));
  }

  renderSamplerSection() {
    const samplers = this.state.song.getSamplers();
    return samplers.map((sampler, idx) => (
      <DrumSamplerComponent
        key={idx}
        idx={idx}
        {...sampler}
        notes={sampler.notes}
        active={sampler.active}
        updateSampler={(idx, style) => this.updateSampler(idx, style)}
        updateSamplerSequence={(idx, notes) =>
          this.updateSamplerSequence(idx, notes)
        }
        activateSampler={() => this.activateSampler(idx)}
      />
    ));
  }

  renderCreationSection() {
    return (
      <div id="create-app">
        <div id="instruments-rack">
          <div id="add-wrapper">
            <button onClick={() => this.addNewBasicSynth()}>Add Synth</button>
            <button onClick={() => this.addNewSampler()}>Add Sampler</button>
          </div>
          {this.renderSynthsSection()}
          {this.renderSamplerSection()}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        <ControlsBar
          isPlaying={this.state.isPlaying}
          tempo={this.state.tempo}
          play={() => this.play()}
          stop={() => this.stop()}
          updateSongTempo={newTempo => this.updateSongtempo(newTempo)}
          addNewBasicSynth={() => this.addNewBasicSynth()}
          addNewSampler={() => this.addNewSampler()}
        />
        <Switch>
          <Route path="/visualizer" component={VisualizerComponent} />
          <Route
            path="/"
            render={() => {
              return this.renderCreationSection();
            }}
          />
        </Switch>
      </div>
    );
  }
}
