import Tone from "tone";
import BasicSynth from './BasicSynth.class.js';

class Song {
  constructor() {
    this.tempo = 130;
    this.instruments = [];
    this.init();
  }

  init(){
    Tone.Transport.bpm.value = this.tempo;
  }

  addBasicSynth = (id, type = 'triangle') => {
    this.instruments.push(new BasicSynth(id, type));
    return this.getSynths();
  };

  getSynths = () => {
    return this.instruments;
  };

  getSynth = idx => {
    return this.instruments[idx];
  };

  updateSynth = (idx, props) => {
    return this.instruments[idx].updateInstrument(props)
  };

  updateSynthSequence = (idx, notes) => {
    console.log(idx);
    this.instruments[idx].updateSequence(notes);
  }

  activateSynth = (idx) => {
    this.instruments[idx].activateInstrument();
  };

  play = () => {
    Tone.Transport.start();
  };

  stop = () => {
    Tone.Transport.stop();
  };
}

export default Song;
