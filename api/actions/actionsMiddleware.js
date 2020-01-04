const { get: getAction } = require('../../data/helpers/actionModel');
const { get: getProject } = require('../../data/helpers/projectModel');


module.exports = {
  validateActionId: async (req, res, next) => {
    try {
      const action = await getAction(req.params.id);
      if (action) {
        req.projectAction = action;
        next();
      } else {
        return res.status(404).json({
          error: `No action matches the id of ${req.params.id}`,
        });
      }
    } catch (error) {
      next("Internal server error.");
    }
  },

  validateBody: async (req, res, next) => {
    if (Object.keys(req.body).length === 0 ) {
      return res.status(400).json({
        error: "The request body cannot be empty."
      });
    }

    const { project_id, description } = req.body;
    if ((!project_id || !description) && req.method === 'POST') {
      return res.status(400).json({
        error: "Some required fields are missing. 'project_id' and 'description' fields are required."
      });
    }

    const project = await getProject(project_id);
    if (!project) {
      return res.status(400).json({
        error: `No project matches the id of ${project_id}. Please provide a valid project_id`
      });
    }

    const validFields = ['project_id', 'description', 'notes', 'completed'];
    const bodyHasUnknownField = Object.keys(req.body)
                                  .map(field => validFields.includes(field.toLowerCase()))
                                  .filter(value => value === false)
                                  .length > 0;
    if (bodyHasUnknownField) {
      return res.status(400).json({
        error: "request body contains some unknown fields"
      });
    }

    next();
  },
};