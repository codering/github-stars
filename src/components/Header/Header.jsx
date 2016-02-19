import React, { Component } from 'react';
import style from './Header.less';

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
      </div>
      <div className={style.syncLoading}>
        {syncLoading ? `loading... , ${syncStatus}` : 'loaded'}
      </div>
    </div>);
  }
}

export default Header;
