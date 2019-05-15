import Tone from "tone";
import Instrument from "./Instrument.class";

export default class BasicSynth extends Instrument {
  constructor(id, oscType) {
    super(id);
    this.instrument = new Tone.Synth(oscType).toMaster();
  }

  updateInstrument = props => {
    this.instrument.oscillator.type = props.oscillator.type;
    this.instrument.envelope.attack = props.envelope.attack;
    this.instrument.envelope.decay = props.envelope.decay;
    this.instrument.envelope.sustain = props.envelope.sustain;
    this.instrument.envelope.release = props.envelope.release;
    return this.instrument;
  };

  getSynthData = () => {
    return {
      notes: this.notes,
      oscillator: {type: this.instrument.oscillator.type},
      envelope: {
        attack: this.instrument.envelope.attack,
        decay: this.instrument.envelope.decay,
        sustain: this.instrument.envelope.sustain,
        release: this.instrument.envelope.release
      }
    }
  }
}
