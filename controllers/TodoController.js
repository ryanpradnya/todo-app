const { validationResult } = require('express-validator/check');

const db = require('../util/Database');

const todoList = db.todolist;

exports.getTodos = async (req, res, next) => {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed.');
            error.statusCode = 422;
            throw error;
        }
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.addTodo = (req, res, next) => { };

exports.updateTodo = (req, res, next) => { };

exports.checkTodo = (req, res, next) => { };

exports.deleteTodo = (req, res, next) => { };
