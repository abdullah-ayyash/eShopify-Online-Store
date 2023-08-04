// Express-validator
const { query, body, validationResult } = require('express-validator');

const loginInputValidate = [
    body('username').notEmpty().withMessage('Username is required').isLength({ min: 4, max: 20 })
        .withMessage('Username must be between 4 and 20 characters').isAlphanumeric().withMessage('Username or Password is invalid')
        .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username or Password is invalid')
    ,
    body('password').notEmpty().withMessage('Password is required').isLength({ min: 8 }).withMessage('Username or Password is invalid')
    // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)
    // .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character')
];

const registerInputValidate = [
    body('username').notEmpty().withMessage('Username is required').isLength({ min: 4, max: 20 })
        .withMessage('Username must be between 4 and 20 characters').isAlphanumeric().withMessage('Username must contain only letters and numbers')
        .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores')
    ,
    body('password').notEmpty().withMessage('Password is required').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character')
    ,
    body('fullName')
    .notEmpty().withMessage('Full name is required')
    .isLength({ min: 3, max: 50 }).withMessage('Full name must be between 3 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/).withMessage('Full name can only contain letters and spaces')
    .trim()
    .escape()
    , 
    body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
];

const LoginInputmiddleware = (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        return next();
    }

    res.send({ errors: result.array() });
}

const registerInputmiddleware = (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        return next();
    }

    res.send({ errors: result.array() });
}

module.exports = {
    loginInputValidate,
    LoginInputmiddleware,
    registerInputValidate,
    registerInputmiddleware

}