import React from 'react';
import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';

class SearchedAlbum extends React.Component {
  render() {
    const { searchedName, arrayOfAlbumObject } = this.props;
    return (
      <div>
        Resultado de álbuns de:
        {' '}
        {searchedName}
        <ul>
          {
            arrayOfAlbumObject
              .map((eachAlbum) => (
                <li key={ eachAlbum.id }>
                  <Link to={ `/${eachAlbum.id}` }>
                    <img
                      src={ eachAlbum.artworkUrl100 }
                      alt={ `${eachAlbum.collectionName} album` }
                    />
                    <h2>{eachAlbum.artistName}</h2>
                    <h4>{eachAlbum.collectionName}</h4>
                  </Link>
                </li>))
          }
        </ul>
      </div>
    );
  }
}

SearchedAlbum.propTypes = {
  searchedName: Proptypes.string.isRequired,
  arrayOfAlbumObject: Proptypes.arrayOf(Proptypes.object).isRequired,
};

export default SearchedAlbum;
