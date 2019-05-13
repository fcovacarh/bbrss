import Tone from "tone";

export default class Instrument {
  constructor(id) {
    this.id = id;
    this.instrument = null;
    this.sequence = null;
    this.active = false;
  }

  activateInstrument = () => {
    if (this.active) {
      if (this.sequence) {
        this.sequence.mute = true;
      }
    } else {
      if (this.sequence) {
        this.sequence.mute = false;
      }
    }
    this.active = !this.active;
  };

  updateSequence = notes => {
    if (this.sequence && notes.length !== 0) {
      notes.forEach((note, idx) => {
        this.sequence.remove(idx);
        this.sequence.add(idx, note);
      });
    } else {
      this.sequence = new Tone.Sequence(
        (time, note) => {
          if (this.instrument) this.instrument.triggerAttackRelease(note, "10hz", time);
        },
        notes,
        "16n"
      );
    }
    (!this.active) ? this.sequence.mute = true : this.sequence.mute = false;
  };
}
