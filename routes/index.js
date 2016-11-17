var TodoController = require('./TodoController.js')
var express = require('express');
var router = express.Router();



router.get('/Todo/:Todo_ID',TodoController.getSingleTodo)
router.get('/Todo',TodoController.getAllTodo)
router.post('/Todo',TodoController.saveTodo )
router.put('/Todo/:Todo_ID',TodoController.editTodo)
router.delete('/Todo/:Todo_ID',TodoController.removeTodo)





module.exports = router ;