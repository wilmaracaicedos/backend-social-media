const redis = require('redis');

const config = require('../config');

const client = redis.createClient({
  url: `redis://${config.redis.user}:${config.redis.password}@${config.redis.host}:${config.redis.port}`
});

client.on('error', err => console.log('Redis Client Error: ', err));

client.connect()
  .then(() => {
    console.log('Redis connected');
  });

async function list(table) {
  const value = await client.get(table);
  return JSON.parse(value);
}

async function get(table, id) {
  const value = await list(`${table}_${id}`);
  return JSON.parse(value);
}

async function upsert(table, data) {
  let key = table;
  if (data && data.id) {
    key = `${key}_${data.id}`;
  }

  client.setEx(key, 10, JSON.stringify(data));
  return true;
}

module.exports = {
  list,
  get,
  upsert,
}
