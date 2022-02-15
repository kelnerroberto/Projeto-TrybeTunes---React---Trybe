import React, { Component } from 'react';
import Header from '../components/Header';

class NotFound extends Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-not-found">
          Álbum não encontrado
        </div>
      </>
    );
  }
}

export default NotFound;
