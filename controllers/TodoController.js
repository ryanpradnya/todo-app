const { validationResult } = require('express-validator/check');

const db = require('../util/Database');

const TodoList = db.todolist;

exports.getTodos = async (req, res, next) => {

};

exports.addTodo = async (req, res, next) => {
    const errors = validationResult(req);

    const title = req.body.title;
    const description = req.body.description;
    const userId = req.userId;
    console.log('userId', userId);
    try {
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed.');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }

        const result = await TodoList.create({
            title: title,
            description: description,
            checked: false,
            userId: userId
        });
        res.status(201).json({ message: 'Todo created!', todoId: result.id });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.updateTodo = (req, res, next) => { };

exports.checkTodo = (req, res, next) => { };

exports.deleteTodo = (req, res, next) => { };
