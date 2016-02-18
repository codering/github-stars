import React, { Component } from 'react';
import style from './Detail.less';
import classnames from 'classnames';
import fa from 'font-awesome/css/font-awesome.css';

class Detail extends Component {
  handleUnstar(repo) {
    this.props.unstar(repo);
  }
  render() {
    const { unstarLoading } = this.props;
    const { data, selectedStar } = this.props.stars;
    const star = data.filter(item => item.id === selectedStar)[0];

    if (!star) {
      return <div />;
    }

    const { id, name, owner } = star;
    const repo = `${owner.login}/${name}`;

    return (<div className={style.normal}>
      <div className={style.topbar}>
        <div className={style.actions}>
          {
            unstarLoading
              ? <button disabled><i className={classnames(fa['fa'], fa['fa-spinner'])} /></button>
              : <button onClick={this.handleUnstar.bind(this, repo)}>
                  <i className={classnames(fa['fa'], fa['fa-star-o'])} /> Unstar
                </button>
          }
        </div>
        <div className={style.clone}>
          Clone: <input textselect value={`git@github.com:${repo}.git`} readOnly />
        </div>
      </div>
      <div className={style.readme}>
        README
      </div>
    </div>);
  }
}

export default Detail;
