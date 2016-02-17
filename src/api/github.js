import fetch from 'isomorphic-fetch';

function _fetch(url, opts) {
  function parseJSON(response) {
    return response.json()
  }
  return fetch(url, opts).then(parseJSON);
}

export async function loadStars() {
  const username = 'sorrycc';
  const url = `https://api.github.com/users/${username}/starred?per_page=100&page=1`;
  return await _fetch(url, {type: 'json'});
}
