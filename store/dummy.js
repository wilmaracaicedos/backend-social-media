const db = {
  'user': [
    { id: '1', name: 'Wilmar' }
  ],
};

async function list(tabla) {
  return db[tabla];
}

async function get(tabla, id) {
  let col = await list(tabla);
  return col.filter(item => item.id === id)[0] || null;
}

function upsert(tabla, data) {
  db[tabla].push(data);
}

function remove(tabla, id) {
  return true;
}

module.exports = {
  list,
  get,
  upsert,
  remove,
};
