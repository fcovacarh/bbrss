import React, { Component } from "react";
import "./SequencerComponent.css";

const notes = {
  C3: "KICK",
  "C#3": "SNARE",
  D3: "HIHAT",
  "D#3": "O.HAT",
  E3: "CRASH",
  F3: "RIDE",
  "F#3": "PERC",
  key: function(n) {
    return Object.keys(this)[n];
  },
  value: function(n) {
    return Object.values(this)[n];
  }
};

export default class SequencerComponent extends Component {
  state = {
    sequence: new Array(16).fill(null)
  };

  toNoteScaleArr(noteScaleStr) {
    return [
      noteScaleStr.replace(/[0-9]/g, ""),
      noteScaleStr.replace(/[^0-9]/g, "")
    ];
  }

  createTable() {
    const initialScale = 3,
      toScale = 3,
      rows = 7,
      cols = 16;
    let table = [];
    table.push(
      <tr>
        <td className="sequencer-controls" colSpan={cols}>
          <button className="clear-button" onClick={() => this.clear()}>
            CLEAR
          </button>
        </td>
      </tr>
    );
    for (let scale = toScale; scale > initialScale - 1; scale--) {
      for (let i = 0; i < rows; i++) {
        let row = [];
        let step = true;
        row.push(
          <td key={notes.key(i)} className="note-cell">
            {notes.value(i)}
          </td>
        );

        for (let j = 0; j < cols; j++) {
          if (j % 4 === 0) step = !step;
          let classNameString = step ? "cell-bar--darken" : "cell-bar";
          if (this.state.sequence[j] === notes.key(i)) {
            classNameString += " cell-active";
          }

          row.push(
            <td
              key={notes.key(i) + j}
              className={classNameString}
              note={notes.key(i)}
              step={j}
              onClick={e => this.activateCell(e)}
            />
          );
        }
        table.push(<tr key={"row-" + notes.key(i) + scale}>{row}</tr>);
      }
    }
    return table;
  }

  activateCell(e) {
    const element = e.target;
    const step = element.getAttribute("step");
    const note = element.getAttribute("note");
    const newSequence = [...this.state.sequence];

    //If there is a note for this step, update to store new note,
    //if note pressed is same as stored update to null,
    //else store new note in step
    if (newSequence[step]) {
      if (note === newSequence[step]) {
        newSequence[step] = null;
      } else {
        newSequence[step] = note;
      }
    } else {
      newSequence[step] = note;
    }
    
    this.props.updateSynthSequence(newSequence);

    this.setState({
      ...this.state,
      sequence: newSequence
    });
  }

  clear() {
    const newSequence = new Array(16).fill(null);
    this.setState(
      {
        ...this.state,
        sequence: newSequence
      },
      this.props.updateSynthSequence(newSequence)
    );
  }

  render() {
    return (
      <table id={`sampler-sequencer-${this.props.idx}`}>
        <tbody>{this.createTable()}</tbody>
      </table>
    );
  }
}
