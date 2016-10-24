/**
 * Created by JorgeDutton on 14/10/2016.
 */
'use strict'

const jwt = require('jsonwebtoken'),
    AvatarElements = require('../models/avatarElements'),
    Skill = require('../models/skill'),
    Profession = require('../models/profession');

//========================================
// GET Avatar elements
//========================================
module.exports.getAllAvatarElements = function(req, res, next) {

    AvatarElements.find({}, function(err, avatarElements){
        if(err) {
            return next(err);
        }
        console.log(JSON.stringify(avatarElements.hairTypes));
        res.json(avatarElements);
    });
};

//========================================
// GET All Skills
//========================================
module.exports.getAllSkills = function(req, res, next) {
    console.log('Looking for all skills. ');

    Skill.find({}, function(err, skills){
        if(err) {
            return next(err);
        }
        res.json(skills);
    });
};

//========================================
// GET Skill by Id
//========================================
module.exports.getSkillById = function (req, res, next) {
    console.log('Looking for skill id: ' + req.params.id + '.');
    //TODO controlar que el dato id es numérico y está entre 1 y 28

    Skill.findOne({ id: req.params.id }, function(err, skill){
        if(err) {
            return next(err);
        }
        res.json(skill);
    });
 };

//========================================
// GET All Professions
//========================================
module.exports.getAllProfessions = function(req, res, next) {
    console.log('Looking for all skills. ');

    Profession.find({}, function(err, profession){
        if(err) {
            return next(err);
        }
        res.json(profession);
    });
};

//========================================
// GET Profession by Id
//========================================
module.exports.getProfessionById = function (req, res, next) {
    console.log('Looking for skill id: ' + req.params.id + '.');

    Profession.findOne({ id: req.params.id}, function(err, user){
        if(err) {
            return next(err);
        }
        res.json(user);
    });
};