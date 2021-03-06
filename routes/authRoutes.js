var AuthenticationController = require('../controllers/authentication'),
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport');

// Middleware to require login/auth
var requireLogin = passport.authenticate('local', { session: false }),
    requireAuth = passport.authenticate('jwt', { session: false }),
    facebookAuth = passport.authenticate('facebook', { scope : 'email' }),
    facebookAuthCallback = passport.authenticate('facebook', { session: false, failureRedirect: '/' }),
    googleAuth = passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email'] }),
    googleAuthCallback = passport.authenticate('google', { session: false, failureRedirect: '/' });
//const instagramAuth = passport.authenticate('instagram')'
//const instagramAuthCallback = passport.authenticate('instagram', { session: false, failureRedirect: '/' });

module.exports = function(app) {
    // Initializing route groups
    var apiRoutes = express.Router(),
        authRoutes = express.Router();

    //=========================
    // Auth Routes and User
    //=========================

    // Set auth routes as subgroup/middleware to apiRoutes
    apiRoutes.use('/auth', authRoutes);

    // Registration route
    authRoutes.post('/register', AuthenticationController.register);

    // Login route
    authRoutes.post('/login', requireLogin, AuthenticationController.login);

    // Logout route
    authRoutes.get('/logout', requireAuth, AuthenticationController.logout);

    //==============================================================
    // Facebook routes
    //==============================================================
    authRoutes.get('/facebook', facebookAuth);
    authRoutes.get('/facebook/callback', facebookAuthCallback, AuthenticationController.facebookCallback);

    //==============================================================
    // Google routes
    //==============================================================
    // GET /auth/google
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request.  The first step in Google authentication will involve redirecting
    //   the user to google.com.  After authorization, Google will redirect the user
    //   back to this application at /auth/google/callback
    authRoutes.get('/google', googleAuth);
    authRoutes.get('/google/callback', googleAuthCallback, AuthenticationController.googleCallback );

    //==============================================================
    // Instagram routes
    //==============================================================
    // GET /auth/google
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request.  The first step in Google authentication will involve redirecting
    //   the user to google.com.  After authorization, Google will redirect the user
    //   back to this application at /auth/google/callback
    //authRoutes.get('/instagram', googleAuth);
    //authRoutes.get('/instagram/callback', googleAuthCallback, AuthenticationController.instagramCallback );

    app.use('/api', apiRoutes);
};