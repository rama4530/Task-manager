const fs = require('fs');
const path = require('path')
const pool = require('../pool');

const migrations = [
    
    '006_create_workspace_members.sql'
]
const runMigrations = async ()=> {
    console.log('🚀 Migration started .....\n')
    for (let file of migrations) {
        try {
            const filePath = path.join(__dirname, file);
            const sql = fs.readFileSync(filePath, 'utf8');
            await pool.query(sql)
    
            console.log(`${file}`)
        }catch(err){
            console.error(`X ${file} - ${err.message}`);
            process.exit(1)
        }
    }    
    console.log('\n ALL migrations complete!!!')
    process.exit(0);
}

runMigrations();
