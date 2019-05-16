import React, { Component } from "react";
import SynthComponent from "./SynthComponent";
import DrumSamplerComponent from "./DrumSamplerComponent";

export default class CreatorComponent extends Component {
  renderSynthsSection() {
    const synths = this.props.getSynths();
    return synths.map((synth, idx) => (
      <SynthComponent
        key={idx}
        idx={idx}
        {...synth.instrument}
        notes={synth.notes}
        active={synth.active}
        updateSynth={(idx, props) => this.props.updateSynth(idx, props)}
        updateSynthSequence={(idx, notes) =>
          this.props.updateSynthSequence(idx, notes)
        }
        activateSynth={() => this.props.activateSynth(idx)}
      />
    ));
  }

  renderSamplerSection() {
    const samplers = this.props.getSamplers();
    return samplers.map((sampler, idx) => (
      <DrumSamplerComponent
        key={idx}
        idx={idx}
        {...sampler}
        notes={sampler.notes}
        active={sampler.active}
        updateSampler={(idx, style) => this.props.updateSampler(idx, style)}
        updateSamplerSequence={(idx, notes) =>
          this.props.updateSamplerSequence(idx, notes)
        }
        activateSampler={() => this.props.activateSampler(idx)}
      />
    ));
  }

  renderCreationSection() {
    return (
      <div id="create-app">
        <div id="instruments-rack">
          <div id="add-wrapper">
            <button onClick={() => this.props.addNewBasicSynth()}>Add Synth</button>
            <button onClick={() => this.props.addNewSampler()}>Add Sampler</button>
          </div>
          {this.renderSynthsSection()}
          {this.renderSamplerSection()}
        </div>
      </div>
    );
  }

  render() {
    return (<div id="Creator">
        {this.renderCreationSection()}
    </div>);
  }
}
