import React, { Component } from "react";

import "./Login.css";
import twitterLogo from "../twitter.svg";

export default class Login extends Component {
  state = {
    username: "",
    sex: "Feminino",
    age: null
  };

  handleInputChange = e => {
    this.setState({ username: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { username, age, sex } = this.state;

    if (!username.length) return;

    localStorage.setItem("@GoTwitter:username", username);
    localStorage.setItem("@GoTwitter:age", age);
    localStorage.setItem("@GoTwitter:sex", sex);

    this.props.history.push("/timeline");
  };

  render() {
    return (
      <div className="login-wrapper">
        <img src={twitterLogo} alt="Logotipo do Twitter" />
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Nome de usuário"
            value={this.state.username}
            onChange={this.handleInputChange}
          />

          <input
            placeholder="Idade"
            value={this.state.age}
            type="number"
            maxLength={2}
            max={100}
            onChange={e => this.setState({ age: e.target.value })}
          />

          <label>
            <select
              style={{
                width: 280
              }}
              value={this.state.sex}
              onChange={e => this.setState({ sex: e.target.value })}
            >
              <option value="Feminino">Feminino</option>
              <option value="Masculino">Masculino</option>
            </select>
          </label>

          <button type="submit">Entrar</button>
        </form>
      </div>
    );
  }
}
