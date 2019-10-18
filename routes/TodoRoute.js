const express = require('express');
const { body } = require('express-validator/check');

const todoController = require('../controllers/TodoController');
const authMiddleware = require('../middleware/AuthMiddleware');

const router = express.Router();

router.get('/:userId', authMiddleware.veryfiToken, todoController.getTodos);

router.post('/post', [
    body('title')
        .trim()
        .not().isEmpty().withMessage('Title is required.'),
    authMiddleware.veryfiToken
],
    todoController.addTodo);

router.put('/:userId/:todoId', [
    body('title')
        .trim()
        .not().isEmpty().withMessage('Title is required.'),
    authMiddleware.veryfiToken
],
    todoController.updateTodo);

router.put('/check/:userId/:todoId', authMiddleware.veryfiToken, todoController.checkTodo);

router.delete('/:userId/:todoId', authMiddleware.veryfiToken, todoController.deleteTodo);

module.exports = router;