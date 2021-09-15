import React, { Component } from 'react';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange({ target }) {
    this.setState({
      name: target.value,
    });
  }

  render() {
    const { name } = this.state;
    const MIN_CHARACTERS_USERNAME = 2;
    return (
      <form data-testid="page-search">
        <input
          type="text"
          data-testid="search-artist-input"
          onChange={ this.handleInputChange }
        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ name.length < MIN_CHARACTERS_USERNAME }
        >
          Pesquisar
        </button>
      </form>
    );
  }
}

export default Search;
