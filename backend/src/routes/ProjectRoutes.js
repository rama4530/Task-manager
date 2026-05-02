const express = require('express');
const router = express.Router();

const authMiddleWare = require('../middleware/authMiddleware');
const validateId = require('../middleware/validateId');

const projectController = require('../controllers/ProjectController');

router.use(authMiddleWare);

router.post('/', projectController.createProject);
router.get('/:id',validateId('id'), projectController.findProjectById);
router.put('/:id', validateId('id'), projectController.updateProject);
router.delete('/:id', validateId('id'), projectController.deleteProject);
router.get('/:workspaceId/projects/', projectController.getAllProjects);

module.exports = router;