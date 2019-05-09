import Tone from "tone";

export default class Instrument {
  constructor(id, oscType) {
    this.id = id;
    this.synth = new Tone.Synth(oscType).toMaster();
    this.sequence = null;
    this.active = false;
  }

  updateInstrument = props => {
    this.synth.oscillator.type = props.oscillator.type;
    this.synth.envelope.attack = props.envelope.attack;
    this.synth.envelope.decay = props.envelope.decay;
    this.synth.envelope.sustain = props.envelope.sustain;
    this.synth.envelope.release = props.envelope.release;
  };

  activateInstrument = () => {
    if (this.active) {
      if (this.sequence) {
        this.sequence.stop();
      }
    } else {
      if (this.sequence) {
        this.sequence.start();
      }
    }
    this.active = !this.active;
  };

  updateSequence = notes => {
    if (notes.length !== 0) {
      if(this.active && this.sequence){
        this.sequence.stop('4n');
      }
      this.sequence = new Tone.Sequence(
        (time, note) => {
          this.synth.triggerAttackRelease(note, "10hz", time);
        },
        notes,
        "4n"
      );
      if(this.active) {
        this.sequence.start('4n');
      }
    }
  };
}
