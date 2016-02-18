import React, { Component } from 'react';
import style from './Header.less';

class Header extends Component {
  handleInputChange(e) {
    this.props.changeKeyword(e.target.value);
  }
  render() {
    const { changeKeyword } = this.props;
    const { syncLoading, syncStatus, keyword } = this.props.uistate;
    return (<div className={style.normal}>
      <div className={style.brand}>
        GithubStars
      </div>
      <div className={style.search}>
        <input value={keyword} onChange={this.handleInputChange.bind(this)} placeholder="Search by keyword" />
      </div>
      <div className={style.syncLoading}>
        {syncLoading ? `loading... , ${syncStatus}` : 'loaded'}
      </div>
    </div>);
  }
}

export default Header;
