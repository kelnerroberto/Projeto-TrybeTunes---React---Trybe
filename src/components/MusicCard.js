import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      favoriteSongs: [],
    };
  }

  async addToFavoriteSongs({ target: { checked } }, musicsFromAlbum) {
    const { favoriteSongs } = this.state;
    if (checked) {
      this.setState({
        favoriteSongs: [...favoriteSongs, musicsFromAlbum],
      });
    }
    console.log(favoriteSongs);
  }

  render() {
    const { musicsFromAlbum } = this.props;
    return (
      <div>
        <ul>
          { musicsFromAlbum.slice(1)
            .map((eachMusic) => (
              <li key={ eachMusic.trackId }>
                <p>{eachMusic.trackName}</p>
                <audio
                  data-testid="audio-component"
                  src={ eachMusic.previewUrl }
                  controls
                >
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  <code>audio</code>
                  .
                </audio>
                <label
                  data-testid={ `checkbox-music-${eachMusic.trackId}` }
                  htmlFor={ eachMusic.trackId }
                >
                  <input
                    type="checkbox"
                    onClick={ (event) => this.addToFavoriteSongs(event, eachMusic) }
                  />
                </label>
              </li>)) }
        </ul>
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicsFromAlbum: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MusicCard;
