const passport = require('passport');
const User = require('../users/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create Local Strategy
const localOptions = { usernameField: 'email' }
const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
    // verify email and password, call done with the user
    // if it is the correct email and password 
    // otherwose call done with false
    User.findOne({ email: email }, function (err, user) {
        if (err) { return done(err); }

        if (!user) { return done(null, false); }

        // compare password ... is 'password' equal to user.password
        user.comparePassword(password, function (err, isMatch) {
            if (err) { return done(err); }
            if (!isMatch) { return done(null, false); }
            return done(null, user);
        })
    });
})

// Create JWT Strategy .. Setup Options first
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
    // See if the user ID in the payload exists in our database
    // if exists call 'done' with that user
    // otherwise call 'done' without user
    User.findById(payload.sub, function (err, user) {
        if (err) { return done(err, false); }

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
})
// Tell Passport to use this Strategy
passport.use(jwtLogin);
passport.use(localLogin);