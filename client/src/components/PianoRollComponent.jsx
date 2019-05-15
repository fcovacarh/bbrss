import React, { Component } from "react";
import "./PianoRollComponent.css";

const notes = ["B", "A#", "A", "G#", "G", "F#", "F", "E", "D#", "D", "C#", "C"];

export default class PianoRollComponent extends Component {
  state = {
    sequence: this.props.notes
  };

  toNoteScaleArr(noteScaleStr) {
    return [
      noteScaleStr.replace(/[0-9]/g, ""),
      noteScaleStr.replace(/[^0-9]/g, "")
    ];
  }

  createTable() {
    const initialScale = 3,
      toScale = 4,
      rows = 12,
      cols = 16;
    let table = [];
    table.push(
      <thead>
        <tr>
          <td className="sequencer-controls" colSpan={cols}>
            <button className="clear-button" onClick={() => this.clear()}>CLEAR</button>
          </td>
        </tr>
      </thead>
    );
    for (let scale = toScale; scale > initialScale - 1; scale--) {
      for (let i = 0; i < rows; i++) {
        let row = [];
        let step = true;
        row.push(
          <td key={notes[i] + scale} className="note-cell">
            {notes[i] + scale}
          </td>
        );

        for (let j = 0; j < cols; j++) {
          if (j % 4 === 0) step = !step;
          let classNameString = step ? "cell-bar--darken" : "cell-bar";
          let noteAndScale = this.state.sequence[j];
          if (noteAndScale) {
            let noteScaleArr = this.toNoteScaleArr(noteAndScale);
            if (notes[i] === noteScaleArr[0] && scale === +noteScaleArr[1]) {
              classNameString += " cell-active";
            }
          }

          row.push(
            <td
              key={notes[i] + scale + j}
              className={classNameString}
              note={notes[i]}
              scale={scale}
              step={j}
              onClick={e => this.activateCell(e)}
            />
          );
        }
        table.push(<tr key={"row-" + notes[i] + scale}>{row}</tr>);
      }
    }
    return table;
  }

  activateCell(e) {
    const element = e.target;
    const step = element.getAttribute("step");
    const note = element.getAttribute("note");
    const scale = element.getAttribute("scale");
    const newSequence = [...this.state.sequence];

    //If there is a note for this step, update to store new note,
    //if note pressed is same as stored update to null,
    //else store new note in step
    if(newSequence[step]){
      const [stepNote, stepScale] = this.toNoteScaleArr(newSequence[step]);
      if(note === stepNote && scale === stepScale) {
        newSequence[step] = null;
      } else {
        newSequence[step] = note + scale;
      }
    } else {
      newSequence[step] = note + scale;
    }

    this.setState(
      {
        ...this.state,
        sequence: newSequence
      },
      this.props.updateSynthSequence(newSequence)
    );
  }

  clear(){
    const newSequence = new Array(16).fill(null);
    this.setState({
      ...this.state,
      sequence: newSequence
    }, 
    this.props.updateSynthSequence(newSequence));
  }

  render() {
    return (
      <table id={`sequencer-${this.props.idx}`}>
        <tbody>{this.createTable()}</tbody>
      </table>
    );
  }
}
