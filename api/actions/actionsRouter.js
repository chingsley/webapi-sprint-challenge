const express = require('express');
const {
  get,
  insert,
  update,
  remove,
} = require('../../data/helpers/actionModel');

const {
  validateBody,
  validateActionId,
} = require('./actionsMiddleware');

const {
  getAllActions,
  createNewAction,
  getAction,
  updateAction,
  deleteAction,
} = require('./actionsController');

const actionsRouter = express();

actionsRouter.get('/', getAllActions);
actionsRouter.post('/', validateBody, createNewAction);
actionsRouter.get('/:id', validateActionId, getAction);
actionsRouter.put('/:id',validateActionId, updateAction);
actionsRouter.delete('/:id', validateActionId, deleteAction);
actionsRouter.use('/*', (req, res, next) => next());

module.exports = actionsRouter;
