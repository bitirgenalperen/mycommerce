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
        res.redirect('/items');
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

router.get('/users', AsyncWrapper( async(req, res) => {
    const users = await User.find();
    // res.send(users);
    res.render('users/users', {users});
}))

router.delete('/users/:userId', AsyncWrapper(async (req, res) => {
    const {userId} = req.params;
    const deletedUser = await User.findByIdAndDelete(userId);
    if(!deletedUser){
        return res.status(404).send("User not found!");
    }
    const results = await Review.deleteMany({author: userId});

    res.send(results);
}))

module.exports = router;