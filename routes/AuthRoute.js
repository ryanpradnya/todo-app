const express = require('express');
const { body } = require('express-validator/check');

const authMiddleware = require('../middleware/AuthMiddleware');

const authController = require('../controllers/AuthController');

const router = express.Router();

router.post('/signup', [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email.'),
  body('password')
    .trim()
    .isLength({ min: 5 }).withMessage('Password length min 5 character.'),
  authMiddleware.checkExistingEmail], authController.signup);

router.post('/signin', [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email.'),
  body('password')
    .trim()
    .not().isEmpty().withMessage('Password is required.')],
  authController.signin);

module.exports = router;