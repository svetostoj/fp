const Authentication = require('./authentication');
const express = require('express');

const passportService = require('../services/passport');
const passport = require('passport');

const User = require('../users/user');

const router = express.Router()

const requireSignin = passport.authenticate('local', { session: false });

router.post('/signup', Authentication.signup);
router.post('/signin', requireSignin, Authentication.signin);

module.exports = router