const express = require('express');
const app = require('./app.js');

const {PORT} = process.env;

app.listen(PORT,(req,res)=>{
    console.log(`Connected to PORT ${PORT}`);
})

