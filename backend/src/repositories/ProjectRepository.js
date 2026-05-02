const pool = require('../db/pool');

class ProjectRepository {

    async createProject(fields){
        const {name, workspace_id, owner_id} = fields;
        const result = await pool.query(
            `INSERT INTO projects (name, workspace_id, owner_id)
            VALUES ($1, $2, $3)
            RETURNING *`, [name, workspace_id, owner_id] 
            );
        return result.rows[0];
    }

    async updateProject(id, fields){
        const keys = Object.keys(fields);
        if(keys.length ===0) return "Failed to update as mandatory fields are passed in the inputs";

        const dynamicQuery = keys.map((key, index) => {
            return `${key} = $${index+1}`
        }).join(', ');

        const values = Object.values(fields);

        const result = await pool.query(
            `UPDATE projects SET ${dynamicQuery}
            WHERE id = $${keys.length + 1}
            AND deleted_at IS NULL
            RETURNING *`,[...values, id]
        )
        return result.rows[0] || null;
    }

    async findById(id){
        const result = await pool.query(
            `SELECT * FROM projects
             WHERE id=$1
             AND deleted_at IS NULL`,[id]
        );
        return result.rows[0] || null;
    }

    async deleteProject(id){
        const result = await pool.query(
            `UPDATE projects
            SET deleted_at = NOW()
            WHERE id=$1 
            AND deleted_at IS NULL
            RETURNING *`,[id]
        );
        return result.rows[0];
    }

    async getAllProject(workspaceId){
        const result = await pool.query(
            `SELECT name, workspace_id, owner_id 
            FROM projects
            WHERE workspace_id = $1
            AND deleted_at IS NULL`, [workspaceId]
        );
        return result.rows;
    }
}