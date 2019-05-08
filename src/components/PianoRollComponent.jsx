import React, { Component } from "react";
import "./PianoRollComponent.css";
import Tone from 'tone';

const notes = ["B", "A#", "A", "G#", "G", "F#", "F", "E", "D#", "D", "C#", "C"];

export default class PianoRollComponent extends Component {
  createTable() {
    const initialScale = 3,
      toScale = 4,
      rows = 12,
      cols = 16;
    let table = [];
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
          let classNameString = step ? "cell-bar--darken" : 'cell-bar';
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
    const step = element.getAttribute('step');
    const otherCell = document.querySelector(`[step="${step}"]`);
    if(otherCell.getAttribute('step') !== step) { console.log('wololo'); otherCell.classList.remove('.cell-active') }
    element.classList.toggle("cell-active");
    this.reReadSequence();
  }

  reReadSequence() {
    const cells = document.querySelectorAll(".cell-active");
    let sequence = new Array(16).fill(null);

    cells.forEach(cell => {
      let step = cell.getAttribute("step");
      let note = cell.getAttribute("note");
      let scale = cell.getAttribute("scale");
      if (typeof sequence[step] === "string" && sequence[step].length > 0) {
        sequence[step] = [sequence[step], [note + scale]];
      } else if (Array.isArray(sequence[step])) {
        sequence[step].push([note + scale]);
      } else {
        sequence[step] = [note + scale];
      }
    });
    this.props.updateSynthSequence(sequence);
  }

  render() {
    return (
      <table id="sequencer">
        <tbody>{this.createTable()}</tbody>
      </table>
    );
  }
}
