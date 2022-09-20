const express = require('express');
const morgan = require('morgan');
const cors=require('cors');
const mongoose = require('mongoose');
require('dotenv').config()

// Database configuration.
const connectDB = require('../server side/config/connectDB')
const app = express();
// middleware
app.use(express.json())
app.use(cors());
// all routes
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const prodRoute = require('./routes/product');
app.use('/api/user',  userRoute);
app.use('/api/auth',  authRoute);
app.use('/api/product',  prodRoute);


const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});