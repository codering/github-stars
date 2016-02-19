import React, { Component } from 'react';
import style from './Header.less';
import classnames from 'classnames';
import fa from 'font-awesome/css/font-awesome.css';

class Header extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      query: '',
    };
  }
  handleInputChange(e) {
    this.setState({
      query: e.target.value,
    });
    this.props.actions.headerSearch(e.target.value);
  }
  render() {
    const { syncLoading, syncStatus } = this.props.uistate;
    return (<div className={style.normal}>
      <div className={style.brand}>
        GithubStars
      </div>
      <div className={style.search}>
        <input value={this.state.query} onChange={this.handleInputChange.bind(this)} placeholder="Search by keyword" />
        <i className={classnames(fa['fa'], fa['fa-search'])} />
      </div>
      <div className={style.syncLoading}>
        {syncLoading ? `loading... , ${syncStatus}` : 'loaded'}
      </div>
    </div>);
  }
}

export default Header;
