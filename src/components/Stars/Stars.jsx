import React, { Component } from 'react';
import StarItem from './StarItem';
import style from './Stars.less';

class Stars extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentWillMount() {
    this.props.actions.syncStars();
  }
  filterData(data) {
    let ret = data;
    const { keyword } = this.props;
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
  renderData(data) {
    if (!data.length) {
      return <div className={style.empty}>no star found</div>;
    }
    return data.map(item => <StarItem key={item.id} data={item} keyword={this.props.keyword} />);
  }
  render() {
    const { data, loading, status } = this.props.stars;
    return <div className={style.normal}>
      {this.renderData(this.filterData(data))}
    </div>;
  }
}

export default Stars;
