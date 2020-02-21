import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './Template.css';
import * as loginActions from '../modules/login';
import Axios from 'axios';

class Template extends Component {
  handleLogout = () => {
    const { LoginActions } = this.props;
    LoginActions.logout().then(() => {
      localStorage.setItem('isLogin', false);
    });
  };

  render() {
    const { isLogin } = this.props;
    const { handleLogout } = this;

    return (
      <div className="template">
        <h2 className="title">Shortly</h2>
        <div>
          <Link className="menu-item" to={'/list'}>
            List
          </Link>
          <Link className="menu-item" to={'/shorten'}>
            Shorten
          </Link>
          {isLogin ? (
            <span
              className="menu-item"
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </span>
          ) : (
            <Link className="menu-item" to={'/Login'}>
              Login
            </Link>
          )}
          {isLogin ? <Redirect to={'/Login'} /> : ''}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    isLogin: state.login.isLogin
  }),
  dispatch => ({
    LoginActions: bindActionCreators(loginActions, dispatch)
  })
)(Template);
