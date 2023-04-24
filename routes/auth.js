const express = require('express');
const router = express.Router();
const AsyncWrapper = require('../utils/AsyncWrapper');
const User = require("../models/user");
const Review = require("../models/review");
const passport = require('passport');
const { LoggedIn } = require('../utils/LoggedIn');
const { Aggregate } = require('mongoose');

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
    // console.log(req.user._id);
    const result = await Review.aggregate([
        {
            $match: {
                _id: req.user._id
            }
        },
        {
            $lookup: {
                from: "reviews",
                localField: "username",
                foreignField: "Author",
                as: "Reviews"
            }
        },
        {
            $group: {
                _id: null,
                average: {
                    $avg: "$rating"
                }
            }
        }
    ])
    const reviews = {};
    // const reviews = await User.findById(req.user._id).populate({
    //     path: 'reviews',
    //     populate: {
    //         path: 'author'
    //     }
    // });
    // Aggregate.l
    // const username = req.user._id;
    // console.log(username);
    // const reviews = await Review.find({username}).populate('username');
    // res.send(result);
    res.render('users/profile', {reviews});
}))

module.exports = router;