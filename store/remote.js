const request = require('request');

function createRemoteDB(host, port) {
  const URL = `http://${host}:${port}`;

  function list(table) {
    const url = `${URL}/${table}`;
    return req('GET', url);
  }

  function get(table, id) {
    const url = `${URL}/${table}/${id}`;
    return req('GET', url);
  }

  function insert(table, data) {
    const url = `${URL}/${table}`;
    return req('POST', url, data);
  }

  function update(table, data) {
    const url = `${URL}/${table}`;
    return req('PUT', url, data);
  }

  function upsert(table, data) {
    if (data.id) {
      return update(table, data);
    }

    return insert(table, data);
  }

  // function query(table, query, join);

  function req(method, url, data) {
    body = '';

    return new Promise((resolve, reject) => {
      request({
        method,
        headers: {
          'content-type': 'application/json',
        },
        url,
        body,
      }, (err, req, body) => {
        if (err) {
          console.log(`Error con la base de datos remota`, err);
          return reject(err.message);
        }

        const resp = JSON.parse(body);
        return resolve(resp.body);
      });
    });
  }

  return {
    list,
    get,
    upsert,
  }
}

module.exports = createRemoteDB;
