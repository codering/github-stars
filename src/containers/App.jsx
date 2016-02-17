import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import * as StarActions from '../actions/stars';
import Stars from '../components/Stars/Stars';

class App extends Component {
  render() {
    console.log(this.props);
    const { actions, stars } = this.props;
    return (<div>
      <h1>Index</h1>
      <Stars stars={stars} actions={actions} />
    </div>);
  }
}

function mapStateToProps(state) {
  return {
    stars: state.stars,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(StarActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
