const express = require('express');
const userRoute = express.Router();

const addUser = require('./method/createUser');
const getUser = require('./method/getUser');
const getUserById = require('./method/getUserById');


userRoute.route('/')
    .post(addUser)
    .get(getUser);

userRoute.route('/:id')
    .get(getUserById);

module.exports = userRoute;