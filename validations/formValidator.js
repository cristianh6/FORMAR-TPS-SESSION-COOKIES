const { body } = require('express-validator');

module.exports = [
    body('nombre')
        .notEmpty().withMessage('Debe ingresar su nombre'),

    body('colors')
        .notEmpty().withMessage('Debe seleccionar un color'),

    body('email')
        .notEmpty().withMessage('Debe ingresar su email'),

    body('edad')
        .isNumeric().withMessage('Debe ingresar una edad')
]