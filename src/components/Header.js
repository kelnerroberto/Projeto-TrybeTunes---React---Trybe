import React, { Component } from 'react';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.getUserName();
  }

  async getUserName() {
    this.setState({
      loading: true,
    });
    const userObject = await getUser();
    const { name } = userObject;
    this.setState({
      username: name,
      loading: false,
    });
  }

  render() {
    const { username, loading } = this.state;
    return (
      <header data-testid="header-component">
        <h2 data-testid="header-user-name">
          {
            loading ? <Loading /> : username
          }
        </h2>
      </header>
    );
  }
}

export default Header;
