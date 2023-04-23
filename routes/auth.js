const express = require('express');
const router = express.Router();
const AsyncWrapper = require('../utils/AsyncWrapper');
const User = require("../models/user");
const passport = require('passport');

// register page
router.get('/register', (req, res) => {
    res.render('users/register');
})

// create new user
router.post('/register', AsyncWrapper(async(req, res, next) => {
    try {
        const {email, username, password} = req.body;
        const newUser = new User({email, username})
        const userRegister = await User.register(newUser, password);
        req.login(userRegister, error => {
            if(error){
                return next(error);
            }
            res.redirect('/items');
        });
    } catch (error) {
        res.redirect('/register');
    }
}))

router.get('/login', (req, res) => {
    res.render('users/login');
})


router.post('/login', 
    passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), 
    (req, res) => {
        res.redirect('/items');
})

router.get('/logout', (req, res) => {
    req.logout(err => {
        if(err) {return next(err);}
        res.redirect('/items');
    });
})

router.get('/profile', (req, res) => {
    res.render('users/profile');
})

module.exports = router;