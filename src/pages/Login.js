import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      disabled: true,
      name: '',
      isLogged: false,
      redirect: false,
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

  async loadingAndCreateUser() {
    const { name } = this.state;
    this.setState({ isLogged: true });
    await createUser({ name });
    this.setState({ redirect: true });
  }

  render() {
    const { disabled, isLogged, redirect } = this.state;
    if (isLogged) {
      return (
        <>
          <Loading />
          { redirect ? <Redirect to="/search" /> : '' }
        </>
      );
    }
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

// Renderização condicional extraída de: https://pt-br.reactjs.org/docs/conditional-rendering.html.

export default Login;
