/**
 * Created by JorgeDutton on 17/10/2016.
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AvatarSchema = new mongoose.Schema({
    hairColors: [
        {
            color: Number,
            image: String
        }
    ],
    skinColors: [
        {
            color: Number,
            image: String
        }
    ],
    hairTypes: [
        {
            color: Number,
            type: Number,
            image: String
        }
    ],
    complements: [
        {
            comp: Number,
            type: Number,
            image: String
        }
    ]
}, { collection: 'followings-avatar-elements' });

module.exports = mongoose.model('AvatarElement', AvatarSchema);