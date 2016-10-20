/**
 * Created by JorgeDutton on 14/10/2016.
 *  "id": 1,
 "name": "Cocinero",
 "desc": "Profesión de cocinero",
 "color": "rgb",
 "skills": [
 {
     "iconId": 1,
     "icon": "skill1.ico",
     "desc": "skill1Desc"
 },
 {
     "iconId": 2,
     "icon": "skill2.ico",
     "desc": "skill2Desc"
 },
 {
     "iconId": 3,
     "icon": "skill3.ico",
     "desc": "skill3Desc"
 }
 ],
 "income": 1200,
 "cardBg": "prof1CardBg"
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProfessionSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    name: String,
    desc: String,
    color: String,
    income: Number,
    cardBg: String,
    skills: [Number],
    universities: [
        {
            name: String,
            location: String
        }
    ]
}, { collection: 'followings-professions' });

module.exports = mongoose.model('Profession', ProfessionSchema);
