const UsersController = require('../controllers/users'),
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function(app) {
    // Initializing route groups
    const apiRoutes = express.Router();

    // User data
    apiRoutes.get('/user', requireAuth, UsersController.userData);

    // User update
    apiRoutes.put('/user', requireAuth, UsersController.updateUser);

    // Set url for API group routes
    app.use('/api', apiRoutes);
};