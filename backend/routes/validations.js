// Express-validator
const { query ,body, validationResult } = require('express-validator');

const validateLoginInput = [
    body('username').notEmpty().withMessage('Username is required').isLength({ min: 4, max: 20 })
    .withMessage('Username must be between 4 and 20 characters').isAlphanumeric().withMessage('Username must contain only letters and numbers')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores')
    ,
    body('password').notEmpty().withMessage('Password is required').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    // .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character')
  ];

  module.exports = {
    validateLoginInput
  }