import React, { Component } from 'react';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      disabled: true,
      name: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange({ target }) {
    this.setState({
      name: target.value,
    }, () => { this.switchButtonEnability(); });
  }

  switchButtonEnability() {
    const { name } = this.state;
    const MIN_CHARACTERS_USERNAME = 3;
    const changeEnability = name.length < MIN_CHARACTERS_USERNAME;
    this.setState({
      disabled: changeEnability,
    });
  }

  loadingAndCreateUser() {
    const { name } = this.state;
    createUser({ name });
  }

  render() {
    const { disabled } = this.state;
    return (
      <div data-testid="page-login">
        <input
          type="text"
          data-testid="login-name-input"
          onChange={ this.handleInputChange }
        />
        <button
          type="submit"
          data-testid="login-submit-button"
          id="login-btn"
          disabled={ disabled }
          onClick={ () => this.loadingAndCreateUser() }
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
