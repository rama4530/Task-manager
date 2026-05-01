const workspaceRepository = require('../repositories/WorkspaceRepository');
const AppError = require('../utils/AppError');

const canModifyWorkspace = async (workspace_id, user_id, currentUser) => {
    const isGlobalAdmin = currentUser.role === 'admin';
    const memberShip = await workspaceRepository.findMember(workspace_id, currentUser.id);
    const isWorkspaceAdmin = memberShip.role === 'admin';
    return isGlobalAdmin || isWorkspaceAdmin;
}
class WorkspaceService {

    async createWorkspace(fields, currentUser){
        const workspaceData = {
            ...fields,
            owner_id: currentUser.id
        }
        return workspaceRepository.create(workspaceData);
    }

    async findWorkspaceById(id){
        return workspaceRepository.findById(id);
    }

    async updateWorkspace(id, fields, currentUser){
        if(!canModifyWorkspace(workspace_id, user_id, currentUser)){
            throw new AppError('You are not allowed to update the user role', 403);
        }
        return workspaceRepository.update(id, fields);
    }

    async deleteWorkspace(id, currentUser){
        if(!canModifyWorkspace(workspace_id, user_id, currentUser)){
            throw new AppError('You are not allowed to delete the workspace', 403);
        }
        return workspaceRepository.delete(id);
    }

    async addMemberToWorkspace(workspace_id, user_id, role, currentUser){
        // Here we are checking if he is part of the workspace
        if(!workspaceRepository.findMember(workspace_id, currentUser.id)){
            throw new AppError('You are not allowed to add member to the workspace', 403);
        }
        return workspaceRepository.addMember(workspace_id, user_id, role);
    }

    async removeMemberFromWorkspace(workspace_id, user_id, currentUser){
        if(!canModifyWorkspace(workspace_id, user_id, currentUser)){
            throw new AppError('You are not allowed to remove member from the workspace', 403);
        }
        return workspaceRepository.removeMember(workspace_id, user_id);
    }

    async updateUserRole(workspace_id, user_id, role, currentUser){
        if(!canModifyWorkspace(workspace_id, user_id, currentUser)){
            throw new AppError('You are not allowed to update the user role', 403);
        }
        return workspaceRepository.updateMemberRole(workspace_id, user_id, role);
    }

    async getAllUsersFromWorkspace(workspace_id){
        return workspaceRepository.getAllMembers(workspace_id);
    }
}

module.exports = new WorkspaceService();