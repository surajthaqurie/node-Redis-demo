const jwt = require('jsonwebtoken');
const tokenConfig = require('../config/token.config');

const { jwtConfig } = require('../config/app.config');

exports.generateToken = (user) => {
    let token = jwt.sign({ _id: user.id, role: user.role }, process.env.JWT_TOKEN_KEY || jwtConfig.JWT_TOKEN_KEY, {
        algorithm: tokenConfig.hashAlgorithm,
        expiresIn: tokenConfig.expries,
        issuer: user._id.toString()
    });
    return token;
}

exports.verifyToken = async (token) => {
    return jwt.verify(token, process.env.JWT_TOKEN_KEY || jwtConfig.JWT_TOKEN_KEY, { algorithms: tokenConfig.hashAlgorithm });
}
