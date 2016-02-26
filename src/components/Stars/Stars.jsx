import React, { Component } from 'react';
import StarItem from './StarItem';
import style from './Stars.less';
import classnames from 'classnames';
import fa from 'font-awesome/css/font-awesome.css';

class Stars extends Component {
  componentWillMount() {
    this.props.actions.starsSync();
  }
  renderData() {
    const { filteredStars, selectedStarId, actions } = this.props;
    if (!filteredStars.length) {
      return <div className={style.empty}>no star found</div>;
    }
    return filteredStars.map(item =>
      <StarItem key={item.id} data={item} keyword={this.props.keyword}
                selected={selectedStarId === item.id}
                actions={actions}
      />
    );
  }
  render() {
    return <div className={style.normal}>
      {this.renderData()}
    </div>;
  }
}

export default Stars;
