import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as loginActions from '../modules/login';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import LoginInput from '../components/LoginInput';

class Login extends Component {
  state = {
    emailValue: '',
    passwordValue: ''
  };

  handleEmailChange = e => {
    this.setState({
      emailValue: e.target.value
    });
  };

  handlePasswordChange = e => {
    this.setState({
      passwordValue: e.target.value
    });
  };

  handleLogin = () => {
    const { emailValue, passwordValue } = this.state;

    const { LoginActions } = this.props;

    LoginActions.login({ email: emailValue, password: passwordValue }).then(
      () => {
        localStorage.setItem('isLogin', true);
      }
    );
  };

  render() {
    const { emailValue, passwordValue } = this.state;
    const { isLogin } = this.props;
    const { handleEmailChange, handlePasswordChange, handleLogin } = this;

    return (
      <div>
        {isLogin ? <Redirect to="/shorten" /> : ''}
        <LoginInput
          emailValue={emailValue}
          passwordValue={passwordValue}
          onEmailChange={handleEmailChange}
          onPasswordChange={handlePasswordChange}
        />

        <button onClick={handleLogin}>Login</button>
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
)(Login);
