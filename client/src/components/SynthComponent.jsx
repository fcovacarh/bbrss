import React, { Component } from "react";
import {
  CircularInput,
  CircularTrack,
  CircularProgress,
  CircularThumb
} from "react-circular-input";
import EnvelopeGraph from "adsr-envelope-graph";
import Switch from "react-switch";
import PianoRollComponent from "./PianoRollComponent";
import "./SynthComponent.css";

export default class SynthComponent extends Component {
  oscTypes = ["triangle", "sine", "square"];

  state = {
    id: 0,
    oscillator: null,
    envelope: {
      attack: 0.005,
      decay: 0.1,
      sustain: 0.3,
      release: 1
    },
    active: false
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      id: this.props.idx,
      oscillator: this.props.oscillator,
      envelope: this.props.envelope,
      active: false
    });
  }

  updateEnvelope(envKey, newValue) {
    const newEnvelope = { ...this.state }.envelope;
    newEnvelope[envKey] = newValue;
    this.setState(
      {
        ...this.state,
        envelope: newEnvelope
      },
      () => {
        this.updateSynth();
      }
    );
  }

  updateOscillator(newValue) {
    const newOscillator = { ...this.state }.oscillator;
    newOscillator.type = newValue.currentTarget.value;
    this.setState(
      {
        ...this.state,
        oscillator: newOscillator
      },
      () => {
        this.updateSynth();
      }
    );
  }

  updateSynth() {
    this.props.updateSynth(this.state.id, {
      envelope: this.state.envelope,
      oscillator: this.state.oscillator
    });
  }

  updateSynthSequence(notes) {
    this.props.updateSynthSequence(this.state.id, notes);
  }

  activateSynth() {
    this.props.activateSynth(this.state.id);
    this.setState({
      ...this.state,
      active: !this.state.active
    });
  }

  render() {
    const { attack, decay, sustain, release } = this.state.envelope;
    const colors = {
      attack: "#ff40fc",
      decay: "#fffc36",
      sustain: "#00fbfe",
      release: "#00f92f"
    };
    const envelopeControls = { attack, decay, sustain, release };
    return (
      <div className="synth">
        {/* Oscillator controls*/}
        <div className="oscillator-controls">
          <div className="activation-button">
            {/* Activate/Deactivate */}
            <Switch onChange={() => this.activateSynth()} checked={this.state.active} />
          </div>
          <div className="oscillator-selector">
            <label htmlFor="oscillator-selector">WAVE TYPE</label>
            <select
              id={`osc-select-${this.state.id}`}
              name="oscillator-selector"
              onChange={e => this.updateOscillator(e)}
            >
              {this.oscTypes.map(oscType => (
                <option key={oscType} value={oscType}>
                  {oscType.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Envelope controls*/}
        <div className="envelope-controls">
          <EnvelopeGraph
            a={this.state.envelope.attack}
            d={this.state.envelope.decay}
            s={this.state.envelope.sustain}
            r={this.state.envelope.release}
            style={{
              border: "1px solid #fff",
              height: "100px",
              width: "300px"
            }}
          />
          <div className="envelope-knobs">
            {Object.entries(envelopeControls).map((value, idx) => {
              return (
                <div className="knob-wrapper">
                  <CircularInput
                    key={value[0]}
                    radius={35}
                    value={value[1]}
                    onChange={e => this.updateEnvelope(value[0], e)}
                  >
                    <CircularTrack strokeWidth={3} />
                    <CircularProgress
                      stroke={colors[value[0]]}
                      strokeWidth={7}
                    />
                    <CircularThumb fill={colors[value[0]]} r={9} />
                  </CircularInput>
                  <label>{value[0].substring(0, 3).toUpperCase()}</label>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sequencer */}
        <div className="sequencer-wrapper">
          <PianoRollComponent
            idx={this.state.id}
            updateSynthSequence={notes => this.updateSynthSequence(notes)}
          />
        </div>
      </div>
    );
  }
}
