import Tone from "tone";
import Instrument from "./Instrument.class";

export default class BasicSynth extends Instrument {
  constructor(id, oscType) {
    super(id);
    this.instrument = new Tone.Synth(oscType).toMaster();
    console.log(this);
  }

  updateInstrument = props => {
    this.instrument.oscillator.type = props.oscillator.type;
    this.instrument.envelope.attack = props.envelope.attack;
    this.instrument.envelope.decay = props.envelope.decay;
    this.instrument.envelope.sustain = props.envelope.sustain;
    this.instrument.envelope.release = props.envelope.release;
    return this.instrument;
  };
}
