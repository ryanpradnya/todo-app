const { validationResult } = require('express-validator/check');

const db = require('../util/Database');

const TodoList = db.todolist;

exports.getTodos = async (req, res, next) => {
    const errors = validationResult(req);

    const userId = req.userId;
    console.log('userId', userId);
    try {
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed.');
            error.statusCode = 422;
            throw error;
        }

        const result = await TodoList.findAll({ where: { userId: userId } })

        if (!TodoList) {
            const error = new Error('Todo list not found!');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: 'Fetched list successfully.',
            TodoList: result
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};

exports.addTodo = async (req, res, next) => {
    const errors = validationResult(req);

    const title = req.body.title;
    const description = req.body.description;
    const userId = req.userId;
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

        const addedTodo = await TodoList.findOne({ where: { id: result.id } });

        res.status(201).json({ message: 'Todo created!', todo: addedTodo });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.updateTodo = async (req, res, next) => {
    const errors = validationResult(req);

    const todoId = req.params['todoId'];
    const title = req.body.title;
    const description = req.body.description;
    try {
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed.');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }

        const result = await TodoList.update({
            title: title,
            description: description
        }, {
            where: { id: todoId }
        });
        const updatedTodo = await TodoList.findOne({ where: { id: todoId } });

        res.status(201).json({ message: 'Todo updated!', todo: updatedTodo });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.checkTodo = async (req, res, next) => {
    const errors = validationResult(req);

    const todoId = req.params['todoId'];
    const checked = req.checked;
    let newChecked;
    let message;
    try {
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed.');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }

        if (checked === false) {
            newChecked = true;
            message = 'Todo checked!';
        } else {
            newChecked = false;
            message = 'Todo unchecked!';
        }

        const result = await TodoList.update({
            checked: newChecked
        }, {
            where: { id: todoId }
        });

        const updatedTodo = await TodoList.findOne({ where: { id: todoId } });

        res.status(201).json({ message: message, todo: updatedTodo });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deleteTodo = async (req, res, next) => {
    const errors = validationResult(req);

    const todoId = req.params['todoId'];
    try {
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed.');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }

        const deletedTodo = await TodoList.findOne({ where: { id: todoId } });

        await TodoList.destroy({
            where: { id: todoId }
        });

        res.status(201).json({ message: 'Todo deleted successfully', todo: deletedTodo });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
