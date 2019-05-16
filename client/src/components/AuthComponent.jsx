import React, { Component } from "react";
import Services from "../tools/Services";
import './AuthComponent.css';

export default class AuthComponent extends Component {
  constructor() {
    super();
    this.services = new Services();
  }

  state = {
    signup: false
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

    this.props.login({username, password});
  }

  render() {
    //TODO add function to onSubmit event
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
          <button>{this.state.signup ? "SIGN UP" : "LOG IN"}</button>
        </form>
      </div>
    );
  }
}
