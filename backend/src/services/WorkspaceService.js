const workspaceRepository = require('../repositories/WorkspaceRepository');
const AppError = require('../utils/AppError');

class WorkspaceService {

    async createWorkspace(fields, currentUser){

    }

    async findWorkspaceById(id, currentUser){

    }

    async updateWorkspace(id, fields, currentUser){

    }

    async deleteWorkspace(id, currentUser){

    }

    async addMemberToWorkspace(workspace_id, user_id, role, currentUser){

    }

    async removeMemberFromWorkspace(workspace_id, user_id, currentUser){

    }

    async updateUserRole(workspace_id, user_id, role){

    }

    async getAllUsersFromWorkspace(){

    }
}