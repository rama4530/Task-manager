const workspaceService = require('../services/WorkspaceService');
const AppError = require('../utils/AppError');

class WorkspaceController {

    async createWorkspace(req, res, next){
        try{
            if(!req.body || Object.keys(req.body).length === 0){
                throw new AppError('Request body is required', 400);
            }
            const result = await workspaceService.createWorkspace(req.body, req.user);
            res.status(201).json({
                message: `Succesfully created the workspace. Workspace id is ${result.id}`
            })
        }catch(error){
            next(error);
        }
    }

    async findWorkspaceById(req, res, next){
        try{  
            const {id} = req.params;
            const result = await workspaceService.findWorkspaceById(id);
            res.status(200).json({
                message: `Workspace found`,
                result: result
            })
        }catch(error){
            next(error);
        }
    }

    async updateWorkspace(req, res, next){
        try{
            if(!req.body || Object.keys(req.body).length === 0){
                throw new AppError('Request body is required', 400);
            }
            const {id} = req.params;
            const result = await workspaceService.updateWorkspace(id, req.body, req.user);
            res.status(200).json({
                message: `Succesfully updated the workspace. Updated details are here ${result.id}`
            })
        }catch(error){
            next(error);
        }
    }

    async deleteWorkspace(req, res, next){
        try{
            const {id} = req.params;
            const result = await workspaceService.deleteWorkspace(id, req.user, req.workspace);
            res.status(200).json({
                message: `Successfully deleted the workspace.`
            })
        }catch(error){
            next(error);
        }
    }

    async addMemberToWorkspace(req, res, next) {
        try{
            if(!req.body || Object.keys(req.body).length === 0){
                throw new AppError('Request body is required', 400);
            }
            const {id} = req.params;
            const {user_id, role} = req.body;
            const result = await workspaceService.addMemberToWorkspace(id, user_id, role, req.user);
            res.status(200).json({
                message: 'Sucessfully added the user to the workspace',
                result: result
            })
        }catch(error){
            next(error);
        }
    }

    async removeMemberFromWorkspace(req, res, next) {
        try{
            const {id, userId} = req.params;
            const result = await workspaceService.removeMemberFromWorkspace(id, userId, req.user);
            res.status(200).json({
                message: 'Successfully removed the user from the workspace',
                MemberInfo: result
            })
        }catch(error){
            next(error);
        }
    }

    async updateUserRole(req, res, next){
        try{
            if(!req.body || Object.keys(req.body).length === 0){
                throw new AppError('Request body is required', 400);
            }
            const {id, userId } = req.params;
            const {role} = req.body;
            const result = await workspaceService.updateUserRole(id, userId, role, req.user);
            res.status(200).json({
                message: 'Sucessfully updated the user role in workspace',
                result: result
            })
        }catch(error){
            next(error);
        }
    }

    async getAllmembers(req, res, next){
        try{
            const {id} = req.params;
            const result = await workspaceService.getAllUsersFromWorkspace(id);
            res.status(200).json({
                message: 'Successfully fetched all users',
                userList: result
            })
        } catch(error){
            next(error);
        }
    }
}

module.exports = new WorkspaceController();