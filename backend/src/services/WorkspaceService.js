const workspaceRepository = require('../repositories/WorkspaceRepository');
const AppError = require('../utils/AppError');

const canModifyWorkspace = async (workspace_id,currentUser) => {
    const isGlobalAdmin = currentUser.role === 'admin';
    const memberShip = await workspaceRepository.findMember(workspace_id, currentUser.id);
    const isWorkspaceAdmin = memberShip?.role === 'admin';
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
        const workspace = await workspaceRepository.findById(id);
        if(!workspace) {
            throw new AppError('Failed to find the workspace record', 404);
        }
        if(!await canModifyWorkspace(workspace_id, currentUser)){
            throw new AppError('You are not allowed to update the user role', 403);
        }
        return workspaceRepository.update(id, fields);
    }

    async deleteWorkspace(id, currentUser, workspace){
        const isOwner = workspace.owner_id === currentUser.id;
        const isGlobalAdmin = currentUser.role === 'admin';
        if(!isOwner && !isGlobalAdmin){
            throw new AppError('You are not allowed to remove member from the workspace', 403);
        }
        return workspaceRepository.delete(id);
    }

    async addMemberToWorkspace(workspace_id, user_id, role, currentUser){
        return workspaceRepository.addMember(workspace_id, user_id, role);
    }

    async removeMemberFromWorkspace(workspace_id, user_id, currentUser){
        if(!await canModifyWorkspace(workspace_id, currentUser)){
            throw new AppError('You are not allowed to remove member from the workspace', 403);
        }
        return workspaceRepository.removeMember(workspace_id, user_id);
    }

    async updateUserRole(workspace_id, user_id, role, currentUser){
        if(!await canModifyWorkspace(workspace_id, currentUser)){
            throw new AppError('You are not allowed to update the user role', 403);
        }
        return workspaceRepository.updateMemberRole(workspace_id, user_id, role);
    }

    async getAllUsersFromWorkspace(workspace_id){
        return workspaceRepository.getAllMembers(workspace_id);
    }
}

module.exports = new WorkspaceService();