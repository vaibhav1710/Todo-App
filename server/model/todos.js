const mongoose = require('mongoose');

const todo = new mongoose.Schema({
    title:{
        type: String,
        trim: true,
        required: true
    },
    description:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Todo', todo);