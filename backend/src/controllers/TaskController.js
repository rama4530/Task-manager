const taskService = require('../services/TaskService');
const AppError = require('../utils/AppError');

class TaskController {

    async createTask(req, res, next) {
        try {
            if (!req.body || Object.keys(req.body).length === 0) {
                throw new AppError('Request body is required', 400);
            }

            const result = await taskService.createTask(req.body, req.user);

            res.status(201).json({
                message: `Successfully created task with id ${result.id}`
            });

        } catch (error) {
            next(error);
        }
    }

    async getTaskById(req, res, next) {
        try {
            const taskId = req.params.id;

            const result = await taskService.getTaskById(taskId);

            res.status(200).json({
                message: 'Successfully found the task',
                task: result
            });

        } catch (error) {
            next(error);
        }
    }

    async getProjectTasks(req, res, next) {
        try {
            const projectId = req.params.project_id;

            const result = await taskService.getTasksByProject(projectId);

            res.status(200).json({
                message: 'Successfully found the tasks',
                tasks: result
            });

        } catch (error) {
            next(error);
        }
    }

    async updateTask(req, res, next) {
        try {
            const taskId = req.params.id;

            if (!req.body || Object.keys(req.body).length === 0) {
                throw new AppError('Update data is required', 400);
            }

            const result = await taskService.updateTask(taskId, req.body, req.user);

            res.status(200).json({
                message: 'Successfully updated the task',
                task: result
            });

        } catch (error) {
            next(error);
        }
    }

    async deleteTask(req, res, next) {
        try {
            const taskId = req.params.id;

            await taskService.deleteTask(taskId, req.user);

            res.status(204).send();

        } catch (error) {
            next(error);
        }
    }
}

module.exports = new TaskController();