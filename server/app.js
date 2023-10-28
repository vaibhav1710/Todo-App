require('dotenv').config();
require('./config/database').connect();
const express = require('express');
const app = express();
const todoRoutes = require('./routes/todoRoute');

app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

app.use('/', todoRoutes);


module.exports = app;



