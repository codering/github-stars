import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import marked from 'marked';

import * as _actions from '../actions/index';

import Stars from '../components/Stars/Stars';
import Header from '../components/Header/Header';
import Login from '../components/Login/Login';
import Sidebar from '../components/Sidebar/Sidebar';
import Detail from '../components/Detail/Detail';

import 'normalize.css';
import style from './App.less';

class App extends Component {
  render() {
    const { user, stars, uistate, actions, detail, filteredStars } = this.props;
    if (!user.login) {
      return <Login actions={actions}
                    loginErrorMsg={uistate.loginErrorMsg}
                    loginLoading={uistate.loginLoading} />;
    }

    return (<div className={style.normal}>
      <Header uistate={uistate} actions={actions} />
      <div className={style.mainSection}>
        <Sidebar userInfo={user.userInfo} starsCount={stars.data.length} actions={actions} />
        <Stars filteredStars={filteredStars}
               selectedStarId={stars.selectedStarId}
               actions={actions}
        />
        <Detail unstarLoading={uistate.unstarLoading}
                readmeLoading={uistate.readmeLoading}
                repo={detail.repo}
                readme={detail.readme}
                actions={actions}
                stars={stars}
        />
      </div>
    </div>);
  }
}

function getFilteredStars(stars, keyword) {
  let ret = stars;
  if (keyword) {
    ret = ret.filter(item => {
      return item.name.indexOf(keyword) > -1 ||
        (item.description && item.description.indexOf(keyword) > -1);
    });
  } else {
    ret = ret.slice(0, 100);
  }
  return ret;
}

function getDetail(_readme, stars) {
  const { data, selectedStarId } = stars;
  const star = data.filter(item => item.id === selectedStarId)[0];

  let repo;
  if (star) {
    const { name, owner } = star;
    repo = `${owner.login}/${name}`;
  }

  let readme;
  if (repo && _readme[repo]) {
    readme = marked(atob(_readme[repo]));
  }

  return { readme, repo };
}

function mapStateToProps(state) {
  return {
    filteredStars: getFilteredStars(state.stars.data, state.uistate.keyword),
    detail: getDetail(state.readme, state.stars),
    stars: state.stars,
    uistate: state.uistate,
    user: state.user,
    readme: state.readme,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(_actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
