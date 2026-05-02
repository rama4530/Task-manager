const projectService = require('../services/projectService');
const AppError = require('../utils/AppError');

class ProjectController {

    async createProject(req, res, next) {
        try{
            if(!req.body || Object.keys(req.body).length === 0){
                throw new AppError('Request body is required', 400);
            }
    
            const result = await projectService.createProject(req.body, req.user);
            res.status(201).json({
                message: 'Successfully created the project.',
                result: result
            })
        }catch(error){
            next(error);
        }
        
    }

    async findProjectById(req, res, next) {
        try {
            const {id} = req.params;
            const result = await projectService.findProjectById(id);
            res.status(200).json({
                message: 'Found the project with project id',
                result: result
            })
        } catch(err) {
            next(err);
        }
    }

    async updateProject(req, res, next) {
        try {
            const {id} = req.params;
            const result = await projectService.updateProject(id, req.body, req.user);
            res.status(200).json({
                message: 'Successfully updated the project',
                result: result
            });
        } catch(err) {
            next(err);
        }
    }

    async deleteProject(req, res, next) {
        try {
            const {id} = req.params;
            const result = await projectService.deleteProject(id, req.user);
            res.status(200).json({
                message: 'Successfully deleted the project',
                result: result
            });
        } catch(err) {
            next(err)
        }
    }

    async getAllProjects(req, res, next){
        try {
            const {workspaceId} = req.params;
            const result = await projectService.getAllProject(workspaceId);
            res.status(200).json({
                message: 'Found all projects',
                result : result
            });
        } catch(err){
            next(err);
        }
    }
}

module.exports = new ProjectController();