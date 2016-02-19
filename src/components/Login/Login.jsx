import React, { Component } from 'react';
import style from './Login.less';

class Login extends Component {
  handleSubmit(e) {
    e.preventDefault();
    const username = this.refs.username.value.trim();
    const password = this.refs.password.value.trim();

    this.props.actions.userLogin({username, password});
  }
  render() {
    const { loginErrorMsg, loginLoading } = this.props;
    return (<div className={style.normal}>
      <div className={style.box}>
        <h2 className={style.title}>Login to GithubStars</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          {
            loginErrorMsg ? <div className={style.loginError}>{loginErrorMsg}</div> : ''
          }
          <div className={style.formItem}>
            <label htmlFor="username">Github Username:</label>
            <input ref="username" id="username" />
          </div>
          <div className={style.formItem}>
            <label htmlFor="password">Github Password:</label>
            <input ref="password" id="password" type="password" />
          </div>
          <div className={style.formItem}>
            <label />
            {
              loginLoading ? <input type="submit" value="..." disabled />
                : <input type="submit" value="Submit" />
            }
          </div>
        </form>
      </div>
    </div>);
  }
}

export default Login;
