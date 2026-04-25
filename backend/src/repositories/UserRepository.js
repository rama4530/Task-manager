const pool = require('../db/pool')

class UserRepository {

    async findByEmail(email) {
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
        return result.rows[0];
    }

    async findById(id){
        const result = await pool.query(
            'SELECT * FROM users WHERE id = $1', [id]
        )
        return result.rows[0];
    }

    async createUser({name, email, password_hash}){
        const result = await pool.query(
            `INSERT INTO users (name, email, password_hash)
            VALUES ($1,$2,$3) 
            RETURNING id, name, email, role, created_at
            `, [name,email,password_hash]);
            return result.rows[0];
    }
}

module.exports = new UserRepository();