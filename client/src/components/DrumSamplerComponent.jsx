import React, { Component } from "react";
import Switch from "react-switch";
import SequencerComponent from "./SequencerComponent";
import "./DrumSamplerComponent.css";

export default class DrumSamplerComponent extends Component {
  state = {
    id: 0,
    style: "house", //default style
    active: false
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      id: this.props.idx
    });
  }

  updateSampler(style) {
    this.props.updateSampler(this.state.id, style);
  }

  updateSamplerSequence(notes) {
    this.props.updateSamplerSequence(this.state.id, notes);
  }

  activateSampler() {
    this.props.activateSampler(this.state.id);
    this.setState({
      ...this.state,
      active: !this.state.active
    });
  }

  render() {
    return (
      <div className="sampler">
        {/* Activate/Deactivate */}
        <div className="sampler-controls">
        <Switch
          onChange={() => this.activateSampler()}
          checked={this.state.active}
        />
        </div>
        <div className="sequencer-wrapper">
          <SequencerComponent
            idx={this.state.id}
            updateSynthSequence={notes => this.updateSamplerSequence(notes)}
          />
        </div>
      </div>
    );
  }
}
