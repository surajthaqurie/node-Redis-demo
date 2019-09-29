module.exports = errorHandler;

const logWriter = require('../helpers/logwriter.helper');

function errorHandler(err, req, res, next) {

    logWriter.writeError(err);

    return res.status(500).json({
        message: 'Interal server error'
    });
}