const express = require('express');
const cors = require('cors');
const { body, param } = require('express-validator/check');

const todoController = require('../controllers/TodoController');
const authMiddleware = require('../middleware/AuthMiddleware');

const router = express.Router();

router.get('/list', cors(), authMiddleware.veryfiToken, todoController.getTodos);

router.post('/add', cors(), [
    body('title')
        .trim()
        .not().isEmpty().withMessage('Title is required.'),
    authMiddleware.veryfiToken
],
    todoController.addTodo);

router.put('/edit/:todoId', cors(), [
    param('todoId')
        .exists()
        .withMessage('todoId is required.'),
    body('title')
        .trim()
        .not().isEmpty().withMessage('Title is required.'),
    authMiddleware.veryfiToken,
    authMiddleware.checkExistingTodo
],
    todoController.updateTodo);

router.put('/check/:todoId', cors(), [
    authMiddleware.veryfiToken,
    authMiddleware.checkExistingTodo],
    todoController.checkTodo);

router.delete('/:todoId', cors(), [
    authMiddleware.veryfiToken,
    authMiddleware.checkExistingTodo],
    todoController.deleteTodo);

module.exports = router;