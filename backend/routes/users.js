const express = require('express');
const router = express.Router();
const usersCtls = require('../controllers/users');
const { checkAuthenticated } = require('../middleware');
const passport = require('passport');
const User = require('../models/user');

module.exports = router
    .post('/signup', usersCtls.signup)
    .post('/login',
        checkAuthenticated,
        passport.authenticate('local'),
        usersCtls.login)
    .post('/logout', usersCtls.logout)
    .get('/getuser', usersCtls.getLoggedInUser);
