const pool = require('../db/pool');

class TaskRepository {

    async create({title, description, status, priority, due_date, project_id, assigned_to, created_by}) {
        const result = await pool.query(
            `INSERT INTO tasks (title, description, status, priority, due_date, project_id, assigned_to,created_by)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
            `, [title, description, status, priority, due_date, project_id, assigned_to, created_by]
        );
        return result.rows[0];
    }

    async findById(id) {
        const result = await pool.query(
            `SELECT id,title, description, status, priority, due_date, project_id, assigned_to, created_at, created_by 
            FROM tasks
            WHERE id = $1
            AND deleted_at IS NULL`, [id]
        );
        return result.rows[0] || null;
    }

    async findByProject(projectId) {
        const result = await pool.query(
            `SELECT id,title, description, status, priority, due_date, project_id, assigned_to, created_at, created_by
             FROM tasks 
             WHERE project_id = $1
             AND deleted_at IS NULL
             ORDER BY created_at DESC`,
            [projectId]);
        return result.rows;
    }

    async update(id, fields) {
        const allowedFields = [
            'title',
            'description',
            'status',
            'priority',
            'due_date',
            'assigned_to'
        ];
    
        const keys = Object.keys(fields)
            .filter(key => allowedFields.includes(key));
    
        if (keys.length === 0) return null;
    
        const dynamicQuery = keys
            .map((key, index) => `${key} = $${index + 1}`)
            .join(', ');
    
        const values = keys.map(key => fields[key]);
    
        const result = await pool.query(
            `UPDATE tasks 
             SET ${dynamicQuery}
             WHERE id = $${keys.length + 1}
             AND deleted_at IS NULL
             RETURNING *`,
            [...values, id]
        );
    
        return result.rows[0] || null;
    }

    async softDelete(id) {
        const result = await pool.query(
            `UPDATE tasks
             SET deleted_at = NOW()
             WHERE id = $1
             AND deleted_at IS NULL
             RETURNING *`,
            [id]
        );
    
        return result.rows[0] || null;
    }
}

module.exports = new TaskRepository();