const express = require('express');
const router = express.Router();

const taskController = require('../controllers/TaskController');
const authMiddleware = require('../middleware/authMiddleware');
const validateId = require('../middleware/validateId');

// Apply auth to all routes
router.use(authMiddleware);

// CREATE
router.post('/createTask', taskController.createTask);

// GET BY ID
router.get('/:id', validateId('id'), taskController.getTaskById);

// GET BY PROJECT
router.get('/projects/:project_id/tasks', validateId('project_id'), taskController.getProjectTasks);

// UPDATE
router.put('/:id', validateId('id'), taskController.updateTask);

// DELETE
router.delete('/:id', validateId('id'), taskController.deleteTask);


module.exports = router;