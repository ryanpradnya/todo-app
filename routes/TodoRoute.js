const express = require('express');
const { body } = require('express-validator/check');

const todoController = require('../controllers/TodoController');
const authMiddleware = require('../middleware/AuthMiddleware');

const router = express.Router();

router.get('/list', authMiddleware.veryfiToken, todoController.getTodos);

router.post('/add', [
    body('title')
        .trim()
        .not().isEmpty().withMessage('Title is required.'),
    authMiddleware.veryfiToken
],
    todoController.addTodo);

router.put('/edit/:todoId', [
    body('title')
        .trim()
        .not().isEmpty().withMessage('Title is required.'),
    authMiddleware.veryfiToken
],
    todoController.updateTodo);

router.put('/check/:todoId', authMiddleware.veryfiToken, todoController.checkTodo);

router.delete('/:todoId', authMiddleware.veryfiToken, todoController.deleteTodo);

module.exports = router;