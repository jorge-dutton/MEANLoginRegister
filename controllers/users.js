'use strict';

var User = require('../models/user'),
    Profession = require('../models/profession');

//========================================
// GET User Data Route
//========================================
module.exports.userData = function(req, res, next) {
    User.findOne({ _id: req.user._id }, function(err, user){
        if (err) {
            return next(err);
        }
        res.json(user);
    });
};

function setUserInfo(request) {
    return {
        _id: request._id,
        username: request.username,
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
    console.log(req.body.username);
    var skills = [],
        deck = [],
        professionsForMatch = [];

    User.findOne({ _id: req.user._id }).exec().then(function (user) {
        var userToSave = user,
            selectedProfessions = user.selectedProfessions,
            avatar = user.avatar,
            username = user.username,
            sex = user.sex;

        if (req.body.username) {
            username = req.body.username;
            userToSave.username = username;
        }

        if (req.body.skin) {
            userToSave.avatar.skin = req.body.skin;
        }

        if (req.body.hair) {
            userToSave.avatar.hair = req.body.hair;
        }


        if (req.body.sex) {
            sex = req.body.sex;
            userToSave.sex = sex;
        }

        if (req.body.skills) {
            skills = req.body.skills;
            userToSave.skills = skills;
        }

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

            userToSave.professionDeck = deck;

            // If user has no selectedProfessions we suggest the three topmost from the
            // professionDeck
            if (!user.selectedProfessions || user.selectedProfessions.length === 0) {
                selectedProfessions = user.professionDeck.slice(0,3);
            }

            console.log('Username ' + username);
            console.log('_id ' + req.user._id);

            User.findOne({
                _id: req.user._id
            }, function(err, user) {

                if (err) { return next(err) }

                user.username = username;
                user.sex = sex;
                user.skills = skills;
                user.selectedProfessions = selectedProfessions;
                user.professionDeck = deck;
                user.avatar = avatar;

                user.save(function(err, user) {
                    if (err) { return next(err); }

                    var userInfo = setUserInfo(user);

                    res.status(201).json({
                        success: true,
                        user: userInfo
                    });
                });

            });

        });
    });
};


