import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';

import * as starActions from '../actions/stars';
import * as uiStateActions from '../actions/uistate';
import * as userActions from '../actions/user';

import Stars from '../components/Stars/Stars';
import Header from '../components/Header/Header';
import Login from '../components/Login/Login';
import Sidebar from '../components/Sidebar/Sidebar';
import Detail from '../components/Detail/Detail';

import 'normalize.css';
import style from './App.less';

class App extends Component {
  render() {
    const { user, _uiStateActions, _starActions, _userActions, stars, uistate } = this.props;
    if (!user.login) {
      return <Login userLogin={_userActions.userLogin} />;
    }

    return (<div className={style.normal}>
      <Header uistate={uistate} changeKeyword={_uiStateActions.changeKeyword} />
      <div className={style.mainSection}>
        <Sidebar userInfo={user.userInfo} starsCount={stars.data.length} />
        <Stars keyword={uistate.keyword} stars={stars} actions={_starActions} />
        <Detail unstarLoading={uistate.unstarLoading} unstar={_starActions.unstar} stars={stars} />
      </div>
    </div>);
  }
}

function mapStateToProps(state) {
  return {
    stars: state.stars,
    uistate: state.uistate,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    _starActions: bindActionCreators(starActions, dispatch),
    _uiStateActions: bindActionCreators(uiStateActions, dispatch),
    _userActions: bindActionCreators(userActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
