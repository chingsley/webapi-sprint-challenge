const {
  get,
  insert,
  update,
  remove,
} = require('../../data/helpers/actionModel');

module.exports = {
  getAllActions: async (req, res, next) => {
    try {
      const actions = await get();
      res.status(200).json(actions);
    } catch (error) {
       console.log('error = ', error);
       next("internal server error");
    }
  },

  createNewAction: async (req, res, next) => {
    try {
      const result = await insert(req.body);
      res.send(result);
    } catch (error) {
      console.log('error = ', error);
      next("Internal server error. Could not create new project");
    }
  },
  getAction: async (req, res) => {
    return res.status(200).json(req.projectAction);
  },
  updateAction: async (req, res) => {
   try {
    const result = await update(req.params.id, req.body);
    return res.status(200).json({ 
      message: "Update is successful",
      action: result,
     });
   } catch (error) {
    next("Failed to update. Internal server error.")
   }
  },
  deleteAction: async (req, res) => {
    try {
      const result = await remove(req.params.id);
      if (result === 1) {
        return res.status(200).json({
          message: "Action successfully deleted."
        });
      } else {
        next("Failed to delete. Something went wrong");
      }
    } catch (error) {
      next("Failed to delete. Internal server error.");
    }
  },
};