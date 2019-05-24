const Authentication = require('../auth/authentication');
const passportService = require('../services/passport');
const passport = require('passport');

const express = require('express');
const User = require('./user');

const router = express.Router()

const requireAuth = passport.authenticate('jwt', { session: false });

router.post('/new', (req, res) => {
    const user = new User(req.body)
    user.save()
        .then((user) => {
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(500).json({ err: err.message })
        })
});

router.get('/all',requireAuth, (req, res) => {
    const users = User.find()
   
        .then((users) => {
            res.status(201).json(users)
        })
        .catch(err => {
            res.status(500).json({ err: err.message })
        })
});
module.exports = router