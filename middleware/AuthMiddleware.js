// const { body } = require('express-validator/check');

const db = require('../util/Database');

const User = db.user;

exports.checkExistingEmail = async (req, res, next) => {
    const email = req.body.email;
    try {
        const user = await User.findOne({ where: { email: email } })
        if (user) {
            const error = new Error('Email is already in use!');
            error.statusCode = 400;
            throw error;
        } else {
            next();
        }
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};
