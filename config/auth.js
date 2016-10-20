
module.exports = {

    'facebookAuth' : {
        'clientID'      : '329619407403164', // your App ID
        'clientSecret'  : 'd27d474ffed75d46ccd2137e3a624ba3', // your App Secret
        'callbackURL'   : 'http://localhost:3000/followings/auth/facebook/callback',
        'profileFields': ['id', 'name', 'email']
    },

    'googleAuth' : {
        'clientID'      : '263690736045-70gmghks7t97lljl75c64kk6aubp064d.apps.googleusercontent.com',
        'clientSecret'  : 'hoc05Py2xYLOWXKkNSR2vABK',
        'callbackURL'   : 'http://localhost:3000/followings/auth/google/callback'
    },

    'insstagramAuth' : {
        'clientID'      : '???',
        'clientSecret'  : '???',
        'callbackURL'   : 'http://localhost:3000/followings/auth/instagram/callback'
    }

};
