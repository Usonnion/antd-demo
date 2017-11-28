/**
 * Created by Administrator on 2017-11-22.
 */
import isomorphicFetch from 'isomorphic-fetch';
class FetchTimeOutError extends Error { };

export const request = (url, options = {}) => {
  const finalOptions = Object.assign({}, options, getDefaultFetchOpts(options, '1'))

  return new Promise((resolve, reject) => {
    const onTimeout = () => reject(new FetchTimeOutError(`Call to ${url} has taken too long!`));
    const timeout = setTimeout(onTimeout, 2000);

    isomorphicFetch(url, finalOptions)
      .then(checkResponseStatus)
      .then(parseResponse)
      .then((response) => {
        clearTimeout(timeout);
        resolve(response);
      })
      .catch((error) => {
        clearTimeout(timeout);
        reject(error);
      })
  })
}

function getDefaultFetchOpts(options, token) {
  return {
    headers: Object.assign(
      { Accept: 'application/json; charset=utf-8' },
      { 'Content-Type': 'application/json' },
      options.headers
    )
  }
}

function checkResponseStatus(response) {
  if (response.ok) {
    return response;
  }
  throw response;
}

function parseResponse(rawResponse) {
  return rawResponse.text()
    .then((response) => {
      try {
        return JSON.parse(response);
      } catch (e) {
        return response;
      }
    });
}
