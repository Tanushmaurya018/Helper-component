const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller');
const { registerValidation, loginValidation } = require('../validation/auth.validation');

// Middleware for validation
const validate = (validationFn) => {
  return (req, res, next) => {
    const { error } = validationFn(req.body);
    if (error) {
      return res.status(400).json({ errors: error.details.map(detail => detail.message) });
    }
    next();
  };
};

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', validate(registerValidation), authController.register);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', validate(loginValidation), authController.login);

module.exports = router;

