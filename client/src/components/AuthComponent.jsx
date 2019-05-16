import React, { Component } from "react";
import Services from "../tools/Services";
import "./AuthComponent.css";

export default class AuthComponent extends Component {
  constructor() {
    super();
    this.services = new Services();
  }

  state = {
    signup: false,
    errors: null
  };

  toggleSignup() {
    this.setState({
      ...this.state,
      signup: !this.state.signup
    });
  }

  submit(e) {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    if (this.state.signup) {
      const secondPassword = e.target.secondPassword.value;
      if (password !== secondPassword) {
        this.setState({
          ...this.state,
          errors: "PASSWORDS DON'T MATCH"
        });
      }
      this.props.signup({ username, password });
    } else {
      this.props.login({ username, password });
    }
  }

  render() {
    return (
      <div id="auth-form">
        <form onSubmit={e => this.submit(e)}>
          <div className="form-logo">BBRSS</div>
          <div className="input-group">
            <label htmlFor="username">USERNAME:</label>
            <input name="username" type="text" />
          </div>
          <div className="input-group">
            <label htmlFor="password">PASSWORD:</label>
            <input name="password" type="password" />
          </div>
          {this.state.signup ? (
            <div className="input-group">
              <label htmlFor="secondPassword">REPEAT PASSWORD:</label>
              <input name="secondPassword" type="password" />
            </div>
          ) : null}
          <div>
            <a onClick={() => this.toggleSignup()}>NEW? SIGN UP</a>
          </div>
          {this.state.errors ? (
            <div className="form-errors">
              <span>{this.state.errors}</span>
            </div>
          ) : null}
          <button>{this.state.signup ? "SIGN UP" : "LOG IN"}</button>
        </form>
      </div>
    );
  }
}
