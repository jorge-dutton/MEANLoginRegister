var ConstantsController = require('../controllers/constants'),
    express = require('express'),
    passport = require('passport');

module.exports = function(app) {
    // Initializing route groups
    var apiRoutes = express.Router();

    //=============================================================
    // Constants Routes for avatar-elements, skills and professions
    //=============================================================
    apiRoutes.get('/skills', ConstantsController.getAllSkills);
    apiRoutes.get('/skill/:id', ConstantsController.getSkillById);

    apiRoutes.get('/professions', ConstantsController.getAllProfessions);
    apiRoutes.get('/profession/:id', ConstantsController.getProfessionById);

    apiRoutes.get('/avatar-elements', ConstantsController.getAllAvatarElements);

    // Set url for API group routes
    app.use('/api', apiRoutes);
};