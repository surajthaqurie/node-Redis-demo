const bcrypt = require('bcrypt');

exports.generateSalt = (salt) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(salt, (err, salted_val) => {
            if (err) reject(err);
            resolve(salted_val);
        });
    });
}

exports.hashPassword = (password, saltString) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltString, (err, hashValue) => {
            if (err) reject(err);
            resolve(hashValue);
        });
    });
}

exports.comparePassword = (reqestedPassword, hashedPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(reqestedPassword, hashedPassword, (err, match) => {
            if (err) reject(err);
            resolve(match);
        });
    });
}