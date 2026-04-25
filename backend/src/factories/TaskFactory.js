class TaskFactory {

    static create(type, data){

        const baseTask = {
            title: data.title,
            description: data.description || null,
            project_id: data.project_id,
            assignee_id: data.assignee_id || null,
            due_date: data.due_date || null,
            created_by: data.created_by,
        }

        switch(type){
            case 'bug': 
                return {
                    ...baseTask,
                    priority: 'high',
                    status: 'todo',
                    type: 'bug'
                }
            case 'feature':
                return {
                    ...baseTask,
                    priority: 'medium',
                    status: 'todo',
                    type: 'feature'
                }
            case 'chore':
                return {
                    ...baseTask,
                    priority: 'low',
                    status: 'todo',
                    type: 'chore'
                }
            default:
                return {
                    ...baseTask,
                    priority: data.priority || 'medium',
                    status: 'todo',
                    type: 'task'
                }
        }
    }
}

module.exports = TaskFactory;