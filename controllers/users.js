'use strict';

const User = require('../models/user'),
    Profession = require('../models/profession');

//========================================
// GET User Data Route
//========================================
module.exports.userData = function(req, res, next) {
    console.log('session? ' + JSON.stringify(req.session));
    User.findOne({ _id: req.user._id }, function(err, user){
        if(err) {
            return next(err);
        }
        res.json(user);
    });
};

function setUserInfo(request) {
    return {
        _id: request._id,
        userName: request.userName,
        email: request.email,
        professionDeck: request.professionDeck,
        selectedProfessions: request.selectedProfessions,
        skills: request.skills,
        avatar: request.avatar
    };
}

/*
*
* Updates user information and sorts the profession's deck based on user skills
*
* */
module.exports.updateUser = function (req, res, next) {

    var skills = req.user.skills,
        deck = [],
        professionsForMatch = [];

    User.findOne({ _id: req.user._id }).exec().then(function(user){

        return Profession.find({}).exec().then(function(professions) {
            var auxProfession = {};
            for (var j = 0; j < professions.length; j++) {

                auxProfession = {
                    id: professions[j].id,
                    match: 0
                };

                for (var i = 0; i < skills.length; i++) {

                    if (professions[j].skills.indexOf(skills[i].id) !== -1) {
                        auxProfession.match += parseInt(skills[i].rating);
                    }

                }

                professionsForMatch.push(auxProfession);
            }

            professionsForMatch.sort( function(a, b) {
                return parseInt(b.match) - parseInt(a.match);
            });

            for (var k = 0, len = professionsForMatch.length; k < len; k++) {
                deck.push(professionsForMatch[k].id);
            }

            user.professionDeck = deck;

            // If user has no selectedProfessions we suggest the three topmost from the
            // professionDeck
            if (!user.selectedProfessions || user.selectedProfessions.length === 0) {
                user.selectedProfessions = user.professionDeck.slice(0,3);
            }

            user.save(function(err, user) {
                if (err) { return next(err); }

                setUserInfo(user);
                res.json(user);
            });

        });
    });
};


