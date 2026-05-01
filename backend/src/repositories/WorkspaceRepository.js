const pool = require('../db/pool')


class WorkspaceRepository {

    async create(data){
        const {name , owner_id} = data;
        const result = await pool.query(
            `INSERT INTO workspaces (name, owner_id) 
            VALUES ($1, $2)
            RETURNING *`,[name, owner_id]
        );
        return result.rows[0];
    }

    async findById(id){
        const result = await pool.query(
            `SELECT name,owner_id FROM workspaces WHERE id = $1
            RETURNING *`,[id]
        );
        return result.rows[0];
    }

    async update(id, fields) {
        const allowedFields = ['name', 'owner_id'];
      
        const keys = Object.keys(fields).filter(key => allowedFields.includes(key));
      
        if (keys.length === 0) {
          throw new Error('No valid fields to update');
        }
      
        const dynamicQuery = keys
          .map((key, index) => `${key} = $${index + 1}`)
          .join(', ');
      
        const values = keys.map(key => fields[key]);
      
        const result = await pool.query(
          `UPDATE workspaces 
           SET ${dynamicQuery} 
           WHERE id = $${keys.length + 1}
           AND deleted_at IS NULL
           RETURNING *`,
          [...values, id]
        );
      
        return result.rows[0] || null;
      }

    async delete(id){
        const result = await pool.query(
            `UPDATE workspaces 
             SET deleted_at = NOW()
             WHERE id = $1
             AND deleted_at IS NULL
             RETURNING *`,[id]
        );

        return result.rows[0] || null;
    }

    async addMember(workspace_id, user_id, role){
        const result = await pool.query(
            `INSERT INTO workspace_members (workspace_id, user_id, role) 
            VALUES($1, $2, $3)
            ON CONFLICT (workspace_id, user_id) DO NOTHING RETURNING workspace_id, user_id, role`,
            [workspace_id, user_id, role]
        );
        return result.rows[0] || null;
    }

    async removeMember(workspace_id, user_id) {
        const result = await pool.query(
          `DELETE FROM workspace_members 
           WHERE workspace_id = $1 AND user_id = $2
           RETURNING workspace_id, user_id`,
          [workspace_id, user_id]
        );
        return result.rows[0] || null;
      }

    async updateMemberRole(workspace_id, user_id, role){
        const result = await pool.query(
            `UPDATE workspace_members 
            SET role=$1 WHERE workspace_id=$2 AND user_id=$3 
            RETURNING workspace_id, user_id, role
            `, [role, workspace_id, user_id]
        );
        return result.rows[0] || null;
    }

    async getAllMembers(workspace_id){
        const result = await pool.query(
            `SELECT u.id, u.name, u.email, wm.role FROM workspace_members wm 
            JOIN users u ON u.id = wm.user_id 
            WHERE wm.workspace_id = $1`,[workspace_id]    
        )
        return result.rows;
    }

    async findMember(workspace_id, user_id){
        const result = await pool.query(
            `SELECT * FROM workspace_members
            WHERE workspace_id =$1 AND user_id = $2
            RETURNING *`,[workspace_id, user_id]
        );
        return result.rows[0] || null; 
    }
}

module.exports = new WorkspaceRepository();