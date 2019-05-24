const jwt = require('jwt-simple');
const config = require('../config');
const User = require('../users/user');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
};

exports.signin = function (req, res, next) {
    // user has aleady had their email and password auth'd
    // we just need to give then a token
    res.send({ token: tokenForUser(req.user) });
    
}
exports.signup = function (req, res, next) {
    const email = req.body.email
    const password = req.body.password

    // see if a user with given email exists
    User.findOne({ email: email }, function (err, existingUser) {

        if (!email || !password) {
            return res.status(422).send({ error: 'You must provide email and password' });
        };
        if (err) { return next(err); }
        // if a user with given email exist, return an error
        if (existingUser) {
            return res.status(422).send({ error: 'Email is in use' })
        }
        // if a user with given email does NOT exist, create and save user record

        const user = new User({
            email: email,
            password: password
        });

        user.save(function (err) {
            // Respond to requet indicating user was created
            res.send({ token: tokenForUser(user) });
        })
    });
};