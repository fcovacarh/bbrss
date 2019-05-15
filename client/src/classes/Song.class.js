import Tone from "tone";
import BasicSynth from "./BasicSynth.class.js";
import Sampler from "./Sampler.class.js";

class Song {
  constructor() {
    this.tempo = 130;
    this.instruments = {
      synths: [],
      samplers: []
    };
    this.init();
  }

  init = () => {
    Tone.Transport.bpm.value = this.tempo;
  }

  play = () => {
    console.log("playing...");
    if(Tone.Transport.state === "stopped") {Tone.Transport.start(); this.playInstruments()}
  };

  stop = () => {
    console.log("stopped");
      if(Tone.Transport.state === "started") Tone.Transport.stop();
  };

  updateTempo = (newTempo) => {
    this.tempo = newTempo;
    Tone.Transport.bpm.value = this.tempo;
  }

  //SYNTHS
  addBasicSynth = (id, type = "triangle") => {
    this.instruments.synths.push(new BasicSynth(id, type));
    return this.getSynths();
  };

  getSynths = () => {
    return this.instruments.synths;
  };

  getSynth = idx => {
    return this.instruments.synths[idx];
  };

  updateSynth = (idx, props) => {
    return this.instruments.synths[idx].updateInstrument(props);
  };

  updateSynthSequence = (idx, notes) => {
    this.instruments.synths[idx].updateSequence(notes);
  };

  activateSynth = idx => {
    this.instruments.synths[idx].activateInstrument();
  };

  //SAMPLERS
  addSampler = (id, style = "house") => {
    this.instruments.samplers.push(new Sampler(id, style));
    return this.getSamplers();
  };

  getSamplers = () => {
    return this.instruments.samplers;
  };

  getSampler = idx => {
    return this.instruments.samplers[idx];
  };

  updateSampler = (idx, style) => {
    return this.instruments.samplers[idx].updateInstrument(style);
  };

  updateSamplerSequence = (idx, notes) => {
    this.instruments.samplers[idx].updateSequence(notes);
  };

  activateSampler = idx => {
    this.instruments.samplers[idx].activateInstrument();
  };

  playInstruments = () => {
    this.instruments.synths
    .concat(this.instruments.samplers)
    .forEach(instrument => {
      Tone.Transport.schedule((time) => {
        if(instrument && instrument.sequence){
          instrument.sequence.start();
        }
      }, '0:0');
    });
  };

  exportSongData = () => {
    const synths = [...this.instruments.synths].map(synth => synth.getSynthData());
    const samplers = [...this.instruments.samplers].map(sampler => sampler.getSamplerData());
    return {
      tempo: this.tempo,
      instruments: {
        synths,
        samplers
      }
    }
  };

  loadSongData = songData => {
    
  };
}

export default Song;
