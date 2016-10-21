
module.exports = {

    'facebookAuth' : {
        'clientID'      : '329619407403164', // your App ID
        'clientSecret'  : 'd27d474ffed75d46ccd2137e3a624ba3', // your App Secret
        'callbackURL'   : 'http://localhost:3000/api/auth/facebook/callback',
        'profileFields': ['id', 'name', 'email']
    },

    'googleAuth' : {
        'clientID'      : '263690736045-2ti5rto4jud88830p9cbtng1nkqi2t6b.apps.googleusercontent.com',
        'clientSecret'  : 'eJPgnPy0aXQv-uW03l0uau8U',
        'callbackURL'   : 'http://localhost:3000/api/auth/google/callback'
    },

    'insstagramAuth' : {
        'clientID'      : '???',
        'clientSecret'  : '???',
        'callbackURL'   : 'http://localhost:3000/api/auth/instagram/callback'
    }

};
