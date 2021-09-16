import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
    };

    this.addToFavoriteSongs = this.addToFavoriteSongs.bind(this);
  }

  addToFavoriteSongs = async ({ target: { checked } }, musicsFromAlbum) => {
    this.setState({
      loading: true,
    });
    if (checked) {
      await addSong(musicsFromAlbum);
    }
    if (!checked) await removeSong(musicsFromAlbum);
    this.setState({
      loading: false,
    });
  }

  render() {
    const { musicsFromAlbum } = this.props;
    const { loading } = this.state;
    const musicMapped = (
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
                  id={ eachMusic.trackId }
                  onClick={ (event) => this.addToFavoriteSongs(event, eachMusic) }
                />
              </label>
            </li>)) }
      </ul>);

    return (
      <div>
        {loading ? <Loading /> : musicMapped}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicsFromAlbum: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MusicCard;
