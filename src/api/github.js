import fetch from 'isomorphic-fetch';

function parseLink(str) {
  const ret = {};
  str.split(',').forEach(function(item) {
    var m = item.match(/<(.+?)>; rel=\"(.+?)\"/);
    ret[m[2]] = m[1];
  });
  return ret;
}

function selectStar(star) {
  const { id, owner, name, html_url, description, forks, watchers, language } = star;
  return {
    id, name, html_url, description, forks, watchers, language,
    owner: {
      avatar_url: owner.avatar_url,
      login: owner.login,
    },
  };
}

function auth(opts = {}, username, password) {
  opts.headers = opts.headers || {};
  opts.headers.Authorization = `Basic ${btoa(`${username}:${password}`)}`;
  console.log(opts, username, password);
  return opts;
}

export async function fetchStars(url, username, password) {
  console.log('x', url, username, password);
  let links;
  const result = await fetch(url, auth({type: 'json'}, username, password)).then(res => {
    links = parseLink(res.headers.get('Link'));
    return res.json();
  });
  return {
    result: result.map(selectStar),
    links,
  };
}

export async function fetchUser(username, password) {
  return await fetch('https://api.github.com/user', auth({}, username, password))
    .then(res => res.json());
}

export async function unstar(repo, username, password) {
  return await fetch(`https://api.github.com/user/starred/${repo}`, auth({
    method: 'DELETE',
  }, username, password));
}
