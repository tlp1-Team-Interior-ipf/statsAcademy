export const errorHandler = (error, req, res, next) => {
    res.status(500).send(error.message);
};

export const DatabaseError = (error) => {
    if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map(e => e.message).join(', ');
        throw new Error(`Validation error: ${messages}`);
    };

    if (error.name === 'SequelizeUniqueConstraintError') {
        throw new Error('Duplicate entry detected');
    };

    throw new Error('Database error: ' + error.message);
};