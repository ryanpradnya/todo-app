const express = require('express');
const { body } = require('express-validator/check');

const todoController = require('../controllers/TodoController');

const router = express.Router();

router.get('/:userId', todoController.getTodos);
router.post('/post', todoController.addTodo);
router.put('/:userId/:todoId', todoController.updateTodo);
router.delete('/:userId/:todoId', todoController.deleteTodo);

module.exports = router;