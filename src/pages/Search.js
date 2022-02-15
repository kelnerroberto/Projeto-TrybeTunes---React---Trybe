import React, { Component } from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import SearchedAlbum from '../components/SearchedAlbum';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      inputValue: '',
      isSearching: false,
      searchedAlbums: [],
      lastSearchedName: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.searchAlbumButton = this.searchAlbumButton.bind(this);
  }

  handleInputChange({ target }) {
    this.setState({
      inputValue: target.value,
    });
  }

  async searchAlbumButton() {
    const { inputValue } = this.state;
    const searchedName = inputValue;
    this.setState({
      inputValue: '',
      isSearching: true,
      lastSearchedName: searchedName,
    });
    const arrayOfAlbumObject = await searchAlbumsAPI(inputValue);
    this.setState({
      isSearching: false,
      searchedAlbums: [...arrayOfAlbumObject],
    });
  }

  searchForm() {
    const { inputValue, searchedAlbums, lastSearchedName } = this.state;
    const MIN_CHARACTERS_USERNAME = 2;
    const searchedAlbumsList = (<SearchedAlbum
      arrayOfAlbumObject={ searchedAlbums }
      searchedName={ lastSearchedName }
    />);
    return (
      <div>
        <Header />
        <form data-testid="page-search">
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ this.handleInputChange }
            value={ inputValue }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ inputValue.length < MIN_CHARACTERS_USERNAME }
            onClick={ () => this.searchAlbumButton() }
          >
            Pesquisar
          </button>
        </form>
        {searchedAlbums.length > 0
          ? searchedAlbumsList : <p>Nenhum álbum foi encontrado</p>}
      </div>
    );
  }

  render() {
    const { isSearching } = this.state;
    if (isSearching) { return <Loading />; }
    return this.searchForm();
  }
}

export default Search;
