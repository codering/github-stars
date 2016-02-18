import React, { Component } from 'react';
import style from './Login.less';

class Login extends Component {
  handleSubmit(e) {
    e.preventDefault();
    const username = this.refs.username.value.trim();
    const password = this.refs.password.value.trim();

    this.props.userLogin({username, password});
  }
  render() {
    return (<div className={style.normal}>
      Login

      <form onSubmit={this.handleSubmit.bind(this)}>
        <input placeholder="username" ref="username" />
        <input placeholder="password" ref="password" type="password" />
        <input type="submit" value="Submit" />
      </form>
    </div>);
  }
}

export default Login;
