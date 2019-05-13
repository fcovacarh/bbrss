import React, { Component } from "react";
import Tone from "tone";

export default class VisualizerComponent extends Component {
  constructor() {
    super();
    this.analyser = new Tone.Analyser("fft", 256);
    Tone.Master.connect(this.analyser);
  }

  draw() {
  }

  render() {
    setInterval(() => {
      this.draw();
    }, 1000 / 60);
    return <React.Fragment>
    </React.Fragment>;
  }
}
