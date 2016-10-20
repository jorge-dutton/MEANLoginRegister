const express = require('express'),
    app = express(),
    flash = require('connect-flash'),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    config = require('./config/main');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const constantsRoutes = require('./routes/constantsRoutes');


//Connecting to mongodb
mongoose.Promise = require('bluebird');
mongoose.connect(config.database)
    .then(function(){
        console.log('connection succesful')
    })
    .catch(function(err){
        console.error(err)
    });

const server = app.listen(config.port);
console.log('Server successfully started on port ' + config.port);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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
