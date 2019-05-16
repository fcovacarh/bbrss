import React, { Component } from "react";

export default class SaveComponent extends Component {
  submit(e) {
    e.preventDefault();
    this.props.saveSongData(e.target.name.value);
  }
  render() {
    return (
      <div id="save-screen">
        <form onSubmit={e => this.submit(e)}>
          <div className="form-logo">BBRSS</div>
          <div className="input-group">
            <label htmlFor="name">NAME:</label>
            <input name="name" type="text" />
          </div>
          <button>SAVE</button>
        </form>
      </div>
    );
  }
}
