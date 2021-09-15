import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
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
