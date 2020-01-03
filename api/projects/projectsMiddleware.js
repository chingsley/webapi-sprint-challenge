const {
  get,
} = require('../../data/helpers/projectModel');

module.exports = {

  validateProjectId: async (req, res, next) => {
    const { projectId } = req.params;
    const project = await get(projectId);
    console.log('project = ', project);
    if (!project) {
      return res.status(404).json({
        error: `No project matches the id of '${projectId}' `
      });
    }
    next();
  },

  validateBody: (req, res, next) => {
    console.log('req.method = ', req.method)
    if (Object.keys(req.body).length === 0 ) {
      return res.status(400).json({
        error: "The request body cannot be empty."
      });
    }

    const { name, description } = req.body;
    if ((!name || !description) && req.method === 'POST') {
      return res.status(400).json({
        error: "Some required fields are missing. 'name' and 'description' fields are required."
      });
    }

    const validFields = ['name', 'description', 'completed', 'actions'];
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
  }
};