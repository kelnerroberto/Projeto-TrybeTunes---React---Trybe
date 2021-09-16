import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      isChecked: false,
    };

    this.addToFavoriteSongs = this.addToFavoriteSongs.bind(this);
  }

  addToFavoriteSongs = async ({ target: { checked, id } }) => {
    this.setState({
      loading: true,
    });
    const { isChecked } = this.state;
    if (isChecked) {
      await removeSong(id);
      this.setState({
        isChecked: !checked,
        loading: false,
      });
    } else {
      await addSong(id);
      this.setState({
        isChecked: checked,
        loading: false,
      });
    }
  }

  render() {
    const { musicsFromAlbum } = this.props;
    const { loading, isChecked } = this.state;
    const musicMapped = (
      <ul>
        {' '}
        <li key={ musicsFromAlbum.trackId }>
          <p>{musicsFromAlbum.trackName}</p>
          <audio
            data-testid="audio-component"
            src={ musicsFromAlbum.previewUrl }
            controls
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
          <label
            data-testid={ `checkbox-music-${musicsFromAlbum.trackId}` }
            htmlFor={ musicsFromAlbum.trackId }
          >
            <input
              type="checkbox"
              id={ musicsFromAlbum.trackId }
              onChange={ this.addToFavoriteSongs }
              checked={ isChecked }
            />
          </label>
        </li>
      </ul>
    );

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
