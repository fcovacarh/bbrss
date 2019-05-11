import Tone from "tone";
import Instrument from "./Instrument.class";

export default class Sampler extends Instrument {
  constructor(id, style = "house") {
    super(id);
    this.preload(style);
  }

  updateInstrument = style => {
    this.preload(style);
  };

  preload = style => {
    console.log(`loading ${style}`);
    let sampler = new Tone.Sampler(
      {
        C3: `${style}/kick.mp3`,
        "C#3": `${style}/snare.wav`,
        D3: `${style}/hihat.wav`,
        "D#3": `${style}/openhihat.wav`,
        E3: `${style}/crash.wav`,
        F3: `${style}/ride.wav`,
        "F#3": `${style}/perc.wav`
      },
      () => {
        console.log('loaded');
        this.instrument = sampler.toMaster();
      },
      "./samples/"
    );
  };
}
