const db = require('../dbConfig.js');
const mappers = require('./mappers');

const getActions = (id) => {
  let query = db('actions');
  if (id) {
    return query
      .where('id', id)
      .first()
      .then(action => {
        if (action) {
          return mappers.actionToBody(action);
        } else {
          return action;
        }
      });
  }
  return query.then(actions => {
    return actions.map(action => mappers.actionToBody(action));
  });
};

module.exports = {
  get: getActions,

  insert: function(action) {
    return db('actions')
      .insert(action)
      .then(([id]) => getActions(id));
  },
  update: function(id, changes) {
    return db('actions')
      .where('id', id)
      .update(changes)
      .then(count => (count > 0 ? getActions(id) : null));
  },
  remove: function(id) {
    return db('actions')
      .where('id', id)
      .del();
  },
};
