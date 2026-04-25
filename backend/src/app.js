const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authRoutes = require('./routes/AuthRoutes');


const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/heath', (req, res)=>{
    res.status(200).json({
        status: 'ok',
        message: 'server is running',
        timestamp: new Date().toISOString()
    })
})

app.use('/api/v1/auth', authRoutes)

app.use((err, req, res, next) => {
    console.error('X Error:', err.message);
    res.status(err.status || 500).json({
        error: err.message || 'Internal server error'
    })
})

module.exports = app;