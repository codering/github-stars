import React, { Component } from 'react';

class Stars extends Component {
  componentWillMount() {
    this.props.actions.loadStars();
  }
  renderData(data) {
    return data.map(item => <li key={item.id}>{item.name}</li>);
  }
  render() {
    if (!this.props.stars) return <div />;
    const { data, loading } = this.props.stars;
    return <div className="stars">
      {loading ? 'loading' : 'loaded'}
      {this.renderData(data)}
    </div>
  }
}

export default Stars;
