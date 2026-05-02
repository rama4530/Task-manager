const projectRepository = require('../repositories/ProjectRepository');
const workspaceRepository = require('../repositories/WorkspaceRepository')

class ProjectService {

    async createProject(data, currentuser){
        const projectData = {
            ...data,
            owner_id: currentuser.id
        }
        return projectRepository.createProject(projectData);
    }

    async findProjectById(id) {
        return projectRepository.findById(id);
    }

    async updateProject(id, fields, currentUser){
        const project = await projectRepository.findById(id);
        if(!project) {
            throw new AppError('Failed to find the project', 404);
        }
        const isOwner = project.owner_id === currentUser.id;
        const isGlobalAdmin = currentUser.role === 'admin';
        if(!isGlobalAdmin && !isOwner) {
            throw new AppError('You are not authorized to make changes to the project', 403);
        }
        const {name, data } = fields;
        
        if(Object.keys(data).length>0 && isOwner) {
            throw new AppError("You are not allowed to update workspace_id or project_id.", 403);
        }
        return projectRepository.updateProject(id, fields);
    }

    async deleteProject(id, currentUser) {
        const project = await projectRepository.findById(id);
        if(!project) {
            throw new AppError('Failed to find the project', 404);
        }
        const isOwner = project.owner_id === currentUser.id;
        const isGlobalAdmin = currentUser.role === 'admin';
        if(!isGlobalAdmin && !isOwner) {
            throw new AppError('You are not authorized to make changes to the project', 403);
        }
        return projectRepository.deleteProject(id);
    }

    async getAllProject(workspaceId) {
        const workspace = await workspaceRepository.findById(workspaceId); 
        if(!workspace) {
            throw new AppError('Failed to find the project', 404);
        }
        return projectRepository.getAllProject(workspaceId);
    }
}

module.exports = new ProjectService();