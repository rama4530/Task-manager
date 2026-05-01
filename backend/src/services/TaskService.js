const taskRepository = require('../repositories/TaskRepository');
const TaskFactory = require('../factories/TaskFactory');
const AppError = require('../utils/AppError');

const assertTaskExists = (task) => {
    if (!task) throw new AppError('Task not found', 404);
};

const canModifyTask = (task, user) =>
    task.created_by === user.id ||
    task.assigned_to === user.id ||
    user.role === 'admin';

class TaskService {

    async createTask(data, currentUser) {
        const taskData = TaskFactory.create(
            data.type || 'task',
            {
                ...data,
                created_by: currentUser.id
            }
        );

        return taskRepository.create(taskData);
    }

    async getTaskById(id) {
        const task = await taskRepository.findById(id);

        assertTaskExists(task);

        return task;
    }

    async getTasksByProject(projectId) {
        return taskRepository.findByProject(projectId);
    }

    async updateTask(id, fields, currentUser) {
        const existing = await taskRepository.findById(id);

        assertTaskExists(existing);

        if (!canModifyTask(existing, currentUser)) {
            throw new AppError('You are not allowed to modify this task', 403);
        }

        return taskRepository.update(id, fields);
    }

    async deleteTask(id, currentUser) {
        const existing = await taskRepository.findById(id);

        assertTaskExists(existing);

        if (!canModifyTask(existing, currentUser)) {
            throw new AppError('You are not allowed to delete this task', 403);
        }

        await taskRepository.softDelete(id);

        return { deleted: true, id };
    }
}

module.exports = new TaskService();