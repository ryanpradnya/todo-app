const jwt = require('jsonwebtoken');

const db = require('../util/Database');
const config = require('../util/Config');

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

exports.veryfiToken = (req, res, next) => {
    let token = req.headers['access-token'];
    let decodedToken;

    if (!token) {
        const error = new Error('No token provided');
        error.statusCode = 403;
        throw error;
    }
    try {
        decodedToken = jwt.verify(token, config.jwtSecret);
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.Id;
    next();
}
