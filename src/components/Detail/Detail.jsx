import React, { Component } from 'react';
import style from './Detail.less';
import marked from 'marked';
import classnames from 'classnames';
import fa from 'font-awesome/css/font-awesome.css';

class Detail extends Component {
  componentWillMount() {
    const repo = this.getRepo();
    if (repo) {
      this.props.actions.readmeFetch(repo);
    }
  }
  getRepo() {
    const { data, selectedStar } = this.props.stars;
    const star = data.filter(item => item.id === selectedStar)[0];
    if (star) {
      const { name, owner } = star;
      return `${owner.login}/${name}`;
    }
  }
  handleUnstar(repo) {
    this.props.actions.starsUnstar(repo);
  }
  render() {
    const { readmeLoading, unstarLoading, readme } = this.props;
    const repo = this.getRepo();

    if (!repo) {
      return <div />;
    }

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
        {
          readmeLoading
          ? <div className={style.readmeLoading}>Loading</div>
          : ''
        }
        {
          readme[repo]
          ? <div className={style.content} dangerouslySetInnerHTML={{__html: marked(atob(readme[repo]))}} />
          : ''
        }
      </div>
    </div>);
  }
}

export default Detail;
