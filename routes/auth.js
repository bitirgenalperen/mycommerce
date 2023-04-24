const express = require('express');
const router = express.Router();
const AsyncWrapper = require('../utils/AsyncWrapper');
const User = require("../models/user");
const Review = require("../models/review");
const passport = require('passport');
const { LoggedIn } = require('../utils/LoggedIn');


function getAvg(obj) {
    let a = 0, i = 0;
    for(let o of obj){
        a += o.rating;
        i++;
    }
    return a/i;
}


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

router.get('/profile', LoggedIn,  AsyncWrapper(async (req, res) => {
    const results = await Review.aggregate([
        {
            $lookup: {
                from: "reviews",
                localField: "_id",
                foreignField: "author",
                as: "reviews"
            }
        },
        {
            $match: {
                author: req.user._id
            }
        },
    ])
    const avg = getAvg(results);
    res.render('users/profile', {results, avg});
}))

module.exports = router;