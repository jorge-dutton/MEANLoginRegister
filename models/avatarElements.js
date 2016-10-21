/**
 * Created by JorgeDutton on 17/10/2016.
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var AvatarSchema = new mongoose.Schema({
    hairTypes: [
        Schema.Types.Mixed
    ],
    complements: [
        Schema.Types.Mixed
    ],
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
    ]

}, { collection: 'followings-avatar-elements' });

module.exports = mongoose.model('AvatarElement', AvatarSchema);