/**
 * Created by JorgeDutton on 14/10/2016.
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SkillSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    name: String,
    icon: String
}, { collection: 'followings-skills' });

module.exports = mongoose.model('Skill', SkillSchema);
