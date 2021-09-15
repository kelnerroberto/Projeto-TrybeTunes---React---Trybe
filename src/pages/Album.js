import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      musicsOfAlbum: [],
      musicArtist: '',
      albumName: '',
    };
  }

  componentDidMount() {
    this.theFunc();
  }

  async theFunc() {
    const { match: { params: { id } } } = this.props;
    const musicsFromAlbum = await getMusics(id);
    this.setState({
      loading: true,
      musicArtist: musicsFromAlbum[0].artistName,
      albumName: musicsFromAlbum[0].collectionName,
      musicsOfAlbum: [...musicsFromAlbum],
    });
  }

  render() {
    const { loading, musicsOfAlbum, musicArtist, albumName } = this.state;
    return (
      <div data-testid="page-album">
        <h2 data-testid="artist-name">{ musicArtist }</h2>
        <h3 data-testid="album-name">{ albumName }</h3>
        <div>
          { loading ? <MusicCard
            musicsFromAlbum={ musicsOfAlbum }
          />
            : ''}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.arrayOf(PropTypes.object).isRequired,
  params: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
};

export default Album;
