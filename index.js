var express = require('express'),
    app = express(),
    flash = require('connect-flash'),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    authRoutes = require('./routes/authRoutes'),
    userRoutes = require('./routes/userRoutes'),
    constantsRoutes = require('./routes/constantsRoutes');

var sessionOptions = {
    secret: 'supersecretisimo',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        url: process.env.DATABASE
    })
};
//Connecting to mongodb
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.DATABASE)
    .then(function(){
        console.log('connection succesful');
    })
    .catch(function(err){
        console.error(err);
    });

var server = app.listen(process.env.PORT || 3000);
console.log('Server successfully started on port ' + (process.env.PORT || 3000));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session(sessionOptions));

app.use(logger('dev'));

//Enable CORS from client side
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(flash());

// use passport session
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
userRoutes(app);
constantsRoutes(app);
