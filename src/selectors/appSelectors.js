import marked from 'marked';
import { createSelector } from 'reselect';

const starsSelector = state => state.stars;
const readmeSelector = state => state.readme;
const uistateSelector = state => state.uistate;
const userSelector = state => state.user;

const filteredStarsSelector = createSelector([
  starsSelector,
  uistateSelector,
], (stars, uistate) => {
  const keyword = uistate.keyword;
  let ret = stars.data;
  if (keyword) {
    ret = ret.filter(item => {
      return item.name.indexOf(keyword) > -1 ||
        (item.description && item.description.indexOf(keyword) > -1);
    });
  } else {
    ret = ret.slice(0, 100);
  }
  return ret;
});

const detailSelector = createSelector([
  starsSelector,
  readmeSelector,
], (stars, _readme) => {
  const { data, selectedStarId } = stars;
  const star = data.filter(item => item.id === selectedStarId)[0];

  let repo;
  if (star) {
    const { name, owner } = star;
    repo = `${owner.login}/${name}`;
  }

  let readme;
  if (repo && _readme[repo]) {
    // Fix encode. Ref: http://blog.sqrtthree.com/2015/08/29/utf8-to-b64/
    readme = marked(decodeURIComponent(escape(atob(_readme[repo]))));
  }

  return { readme, repo };
});

export default createSelector([
  starsSelector,
  readmeSelector,
  uistateSelector,
  userSelector,
  filteredStarsSelector,
  detailSelector,
], (stars, readme, uistate, user, filteredStars, detail) => {
  return {
    stars,
    readme,
    uistate,
    user,
    filteredStars,
    detail,
  };
});
