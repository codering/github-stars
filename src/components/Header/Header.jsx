import React, { Component } from 'react';
import style from './Header.less';

class Header extends Component {
  handleInputChange(e) {
    this.props.changeKeyword(e.target.value);
  }
  render() {
    const { keyword, changeKeyword } = this.props;
    const { loading, status } = this.props.stars;
    return (<div className={style.normal}>
      <div className={style.brand}>
        GithubStars
      </div>
      <div className={style.search}>
        <input value={keyword} onChange={this.handleInputChange.bind(this)} placeholder="Search by keyword" />
      </div>
      <div className={style.loading}>
        {loading ? `loading... , ${status}` : 'loaded'}
      </div>
    </div>);
  }
}

export default Header;
