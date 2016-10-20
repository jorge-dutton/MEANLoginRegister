/**
 * Created by JorgeDutton on 14/10/2016.
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
    userName: String,
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: String,
    sex: String,
    zip: String,
    alias: String,
    avatar: {
        skin: String,
        hair: String,
        complements: [String]
    },
    birthDate: Date,
    selectedProfessions: [Number],
    professionDeck: [Number],
    skills: [
        { id: Number, rating: Number }
    ]

}, { collection: 'followings-users' });

UserSchema.pre('save', function(next) {
    const user = this,
        SALT_FACTOR = 5;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if (err) return next(err);


        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

// Method to compare password for login
UserSchema.methods.comparePassword = function(candidatePassword, next) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) { return next(err); }

        next(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);