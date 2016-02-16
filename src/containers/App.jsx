import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class App extends Component {
  render() {
    return (<div>
      <h1>Index</h1>
      <ul>
        <li><Link to="/todos">Todos</Link></li>
      </ul>
    </div>);
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(App);
