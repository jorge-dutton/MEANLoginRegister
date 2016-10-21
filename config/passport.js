/**
 * Created by JorgeDutton on 14/10/2016.
 */
const passport = require('passport'),
    User = require('../models/user'),
    config = require('./main'),
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    LocalStrategy = require('passport-local'),
    FacebookStrategy = require('passport-facebook').Strategy,
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    InstagramStrategy = require('passport-instagram').Strategy,
    configAuth = require('./auth');

// We will tell passport that we have opted to use the email field rather than the username(default)
const localOptions = { usernameField: 'email'};

// Now, we will set up the local login strategy, which will be used to authenticate users with an email address and password.
// A successful local login will yield the user a JSON Web Token to use to authenticate future requests automatically.
const localLogin = new LocalStrategy(localOptions,
    function(email, password, done) {
        User.findOne({ email: email }, function(err, user) {
            if(err) { return done(err); }
            if(!user) {
                return done(null, false, {
                    message: 'Your login details could not be verified. Please try again.'
                });
            }

            user.comparePassword(password, function(err, isMatch) {
                if (err) { return done(err); }
                if (!isMatch) {
                    return done(null, false, { message: "Your login details could not be verified. Please try again." });
                }

                return done(null, user);
            });
        });
});

var cookieExtractor = function(req) {
    console.log(req.cookies);
    var token = null;
    if (req && req.cookies) token = req.cookies['jwt'];
    return token;
};

// Now, let's set up the JWT authentication options
const jwtOptions = {
    // Telling Passport to check authorization headers for JWT
    jwtFromRequest: cookieExtractor,
    // Telling Passport where to find the secret
    secretOrKey: config.secret
};

// Setting up JWT login strategy passing through our options...
//Please note, some people have had issues with this step.
// Depending on your setup, you might need to replace payload._id with payload.doc._id or payload.document._id.
// When in doubt, add console.log(payload); to your code and search the console for the right user ID
// if you are always getting the same user back when logging in different user accounts.
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    console.log("Payload " + JSON.stringify(payload));
    User.findById(payload._id, function(err, user) {
        if (err) { return done(err, false); }

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
});

//==========================
// Facebook Login
//==========================
//Facebook strategy optoins
const facebookOptions = {
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
    profileFields: configAuth.facebookAuth.profileFields
};

//Facebook strategy: Facebook devuelve el token y el profile
const facebookLogin = new FacebookStrategy(facebookOptions, function(token, refreshToken, profile, done){

    process.nextTick(function(){

        User.findOne({ 'facebook.id': profile.id }, function(err, user) {

            if (err) return done(err);

            if (user) {
                return done(null, user);
            } else {
                //TODO Si el usuario de facebook no existe creamos uno con los datos devueltos en profile
                //

                newUser = new User();

                newUser.facebook = {
                    id: profile.id,
                    token: token
                };

                newUser.userName = profile.name.givenName + ' ' + profile.name.familyName;
                newUser.email = profile.emails[0].value;

                newUser.save(function(err) {
                    if (err) throw err;

                    return done(null, newUser);
                });
            }
        });
    });
});

//==========================
// Google Login
//==========================
//Google strategy optoins
const googleOptions = {
    clientID: configAuth.googleAuth.clientID,
    clientSecret: configAuth.googleAuth.clientSecret,
    callbackURL: configAuth.googleAuth.callbackURL
};

//Google strategy
const googleLogin = new GoogleStrategy(googleOptions, function(token, refreshToken, profile, done){
    console.log('GOOGLE Profile ' + JSON.stringify(profile));
    console.log('GOOGLE Profile ' + profile.emails);

    process.nextTick(function(){

        User.findOne({ 'googleId': profile.id }, function(err, user) {

            if (err) return done(err);

            if (user) {
                return done(null, user);
            } else {
                newUser = new User();

                newUser.google = {
                    id: profile.id,
                    token: token
                };

                newUser.userName = profile.displayName;
                newUser.email = profile.emails[0].value;

                newUser.save(function(err) {
                    if (err) throw err;

                    return done(null, newUser);
                });
            }
        });
    });
});

//==========================
// Instagram Login
//==========================
//Facebook strategy optoins
const instagramOptions = {
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL
};

//Facebook strategy: Facebook devuelve el token y el profile
const instagramkLogin = new FacebookStrategy(instagramOptions, function(token, refreshToken, profile, done){

    process.nextTick(function(){

        User.findOne({ 'facebook.id': profile.id }, function(err, user) {

            if (err) return done(err);

            if (user) {
                return done(null, user);
            } else {
                //TODO Si el usuario de facebook no existe creamos uno con los datos devueltos en profile
                //

                newUser = new User();

                newUser.facebook = {
                    id: profile.id,
                    token: token
                };

                newUser.userName = profile.name.givenName + ' ' + profile.name.familyName;
                newUser.email = profile.emails[0].value;

                newUser.save(function(err) {
                    if (err) throw err;

                    return done(null, newUser);
                });
            }
        });
    });
});

passport.serializeUser(function(user, done) {
    console.log('User serialized ' + user.email);
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

// Finally allow passport to use the strategies we defined
passport.use(jwtLogin);
passport.use(localLogin);
passport.use(facebookLogin);
passport.use(googleLogin);