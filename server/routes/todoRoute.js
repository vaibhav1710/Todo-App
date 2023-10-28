const express = require('express');

const router = express.Router();

const {createTask, getTask, updateTask, deleteTask} = require('../controllers/todosOperation');

router.post('/create', createTask);
router.get('/getTask', getTask);
router.put('/updates/:id', updateTask);
router.delete('/delete/:id', deleteTask);


module.exports = router;