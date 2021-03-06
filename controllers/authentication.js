/**
 * Created by JorgeDutton on 14/10/2016.
 */
'use strict'

const jwt = require('jsonwebtoken'),
    crypto = require('crypto'),
    User = require('../models/user');

//function to generate a JSON web token from the user object we pass in
function generateToken(user) {
    return jwt.sign(user, process.env.SECRET, {
        expiresIn : 60*60*24 // in seconds
    });
}

//We don't want to use the entire user object to sign our JWTs-- that's a lot of information to eventually store in a cookie.
// Plus, we don't want to be returning huge blocks of what could be sensitive user information.
// We need control. Let's create a function to select the user information we want to pass through
function setUserInfo(request) {
    return {
        _id: request._id,
        username: request.username,
        email: request.email

    };
}

//========================================
// Login Route
//========================================
module.exports.login = function(req, res, next) {

    var userInfo = setUserInfo(req.user),
        token = generateToken(userInfo);

    res.cookie('jwt',token);

    res.status(200).json({
        token: token,
        user: userInfo
    });
};

//========================================
// Logout Route
//========================================
module.exports.logout = function(req, res, next) {

    req.session.destroy();
    res.cookie('jwt', '');

    res.status(200).json({
        message: 'Logout successful'
    });
};

//========================================
// Registration Route
//========================================
module.exports.register = function(req, res, next) {
    // Check for registration errors
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    // Return error if no email provided
    if (!email) {
        return res.status(422).send({ error: 'You must enter an email address.'});
    }

    // Return error if full name not provided
    if (!username) {
        return res.status(422).send({ error: 'You must enter your full name.'});
    }

    // Return error if no password provided
    if (!password) {
        return res.status(422).send({ error: 'You must enter a password.' });
    }

    User.findOne({ email: email }, function(err, existingUser) {
        if (err) { return next(err); }

        // If user is not unique, return error
        if (existingUser) {
            return res.status(422).send({ error: 'That email address is already in use.' });
        }

        // If email is unique and password was provided, create account
        var user = new User({
            email: email,
            password: password,
            username: username
        });

        user.save(function(err, user) {
            if (err) { return next(err); }

            var userInfo = setUserInfo(user);

            res.status(201).json({
                token: 'JWT ' + generateToken(userInfo),
                user: userInfo
            });
        });
    });
};

module.exports.facebookCallback = function (req, res, next) {
    var userInfo = setUserInfo(req.user);
    res.status(200).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
    });
};

module.exports.googleCallback = function (req, res, next) {
    var userInfo = setUserInfo(req.user);
    res.status(200).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
    });
};

module.exports.instagramCallback = function (req, res, next) {
    var userInfo = setUserInfo(req.user);
    res.status(200).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
    });
};

