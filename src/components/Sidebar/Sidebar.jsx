import React, { Component } from 'react';
import style from './Sidebar.less';
import classnames from 'classnames';
import fa from 'font-awesome/css/font-awesome.css';

class Login extends Component {
  render() {
    const { avatar_url } = this.props.userInfo;
    return (<div className={style.normal}>
      <div className={style.photo}>
        <img src={`${avatar_url}&s=160`} />
      </div>
      <div className={style.menu}>
        <ul>
          <li className={style.menuActive}><i className={classnames(fa['fa'], fa['fa-star'])} /> My Stars</li>
          <li><i className={classnames(fa['fa'], fa['fa-rss'])} /> Feeds</li>
          <li><i className={classnames(fa['fa'], fa['fa-thumbs-up'])} /> Trends</li>
        </ul>
      </div>
    </div>);
  }
}

export default Login;
