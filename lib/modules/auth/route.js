const express = require('express');
const loginRoute = express.Router();

const { authenticateUser } = require('./method/auth');
const passport = require('passport');

loginRoute.route('/')
    .post(passport.authenticate('local', { session: false }), authenticateUser);

module.exports = loginRoute;