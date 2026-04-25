const app = require('./app');
const pool = require('./db/pool')
require('dotenv').config();

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=> {
    console.log(`🚀 Server runnig on post ${PORT}`)
})