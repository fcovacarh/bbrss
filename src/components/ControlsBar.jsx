import React, { Component } from "react";

export default class ControlsBar extends Component {
  render() {
    return (
      <div>
        <button onClick={() => this.props.addBasicSynth()}>Add Synth</button>
      </div>
    );
  }
}
