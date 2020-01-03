const express = require('express');

const {
  validateProjectId,
  validateBody,
} = require('./projectsMiddleware');

const {
  getAllProjects,
  createNewProject,
  fetchProjectActions,
  updateProject,
  deleteProject
} = require('./projectsController');


const router = express();

router.get('/', getAllProjects);
router.get('/:projectId/actions', validateProjectId, fetchProjectActions);
router.post('/', validateBody, createNewProject);
router.put('/:projectId', validateProjectId, validateBody, updateProject);
router.delete('/:projectId', validateProjectId, deleteProject);
router.put('/*', (req, res, next) => next());

module.exports = router;