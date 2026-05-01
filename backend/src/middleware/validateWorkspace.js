const AppError = require("../utils/AppError");
const workspaceRepository = require("../repositories/WorkspaceRepository");

const validateWorkspace = (param) => {
  return async (req, res, next) => {
    try {
      const id = req.params[param];
      const workspace = await workspaceRepository.findById(id);
      if (!workspace) {
        throw new AppError("Failed to find the workspace record", 404);
      }
      req.workspace = workspace;
      next();
    } catch (err) {
      next(err);
    }
  };
};

module.exports = validateWorkspace;
