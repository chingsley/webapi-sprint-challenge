const {
  get,
  insert,
  update,
  remove,
  getProjectActions,
} = require('../../data/helpers/projectModel');

module.exports = {
  getAllProjects: async(req, res, next) => {
    try {
      const projects = await get();
      // throw new Error("some error"); // used to test my catch section.
      res.status(200).json(projects);
    } catch(error) {
      // console.log('\n\n*******************\n error = ', error);
      next("internal server error");
    }
  },

  createNewProject: async (req, res, next) => {
    try {
      const result = await insert(req.body);
      res.send(result);
    } catch (error) {
      next("Internal server error. Could not create new project");
    }
  },

  fetchProjectActions: async (req, res, next) => {
    try {
      const actions = await getProjectActions(req.params.projectId);
      return res.status(200).json(actions);
    } catch (error) {
      next("Internal server error");
    }
  },

  updateProject: async (req, res, next) => {
    try {
      const result = await update(req.params.projectId, req.body);
      return res.status(200).json({result});
    } catch (error) {
      next("Internal server error. Update failed.")
    }
  },

  deleteProject: async (req, res, next) => {
    try {
      const result = await remove(req.params.projectId);
      if (result === 1) {
        return res.status(200).json({ message: `Done. Project ${req.params.projectId} has been deleted.` })
      } else {
        next("Operation failed. Internal server error");
      }
    } catch (error) {
      console.log(error);
      next("Internal server error. Operation failed.")
    }
  },
};


