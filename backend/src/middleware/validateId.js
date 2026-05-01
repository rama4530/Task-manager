const AppError = require('../utils/AppError');

const validateId = (paramName) => (req, res, next) => {
    const rawValue = req.params[paramName];

    if (!rawValue || rawValue.trim() === '') {
        return next(new AppError(`${paramName} is required`, 400));
    }

    const value = Number(rawValue);

    if (Number.isNaN(value)) {
        return next(new AppError(`Invalid ${paramName}`, 400));
    }

    req.params[paramName] = value; // overwrite with number

    next();
};

module.exports = validateId;