const express = require('express');
const router = express.Router();
const AsyncWrapper = require('../utils/AsyncWrapper');
const {LoggedIn} = require('../utils/LoggedIn');
const Item = require("../models/item");
const {capitalizeFirstLetter, getAvg} = require("../utils/Helper");


router.get('/', AsyncWrapper(async (req, res) => {
    let {article} = req.query;
    if(article){
        const items = await Item.find({article});
        article = capitalizeFirstLetter(article);
        res.render('items/index', {items, article});
    }else{
        const items = await Item.find({});
        res.render('items/index', {items, article: "All"});
    }
    
}))

router.get("/new", LoggedIn, (req, res) => {
    res.render('items/new');
    
})

router.post('/', LoggedIn, AsyncWrapper(async (req, res) => {
    const {name, description, article, price, image} = req.body;
    // console.log(name, description, article, price, image);
    const newItem = new Item({name, description, article, price, image});
    await newItem.save();
    res.redirect(`/items/${newItem._id}/edit`);
}))

router.get('/:id', LoggedIn, AsyncWrapper(async (req, res) => {
    const {id} = req.params;
    const item = await Item.findById(id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    });
    const avg = getAvg(item.reviews);
    res.render('items/show', {item, avg});
}))

router.get('/:id/edit', LoggedIn, AsyncWrapper(async (req, res) => {
    const {id} = req.params;
    const item = await Item.findById(id);
    res.render('items/edit', {item});
}))

// category değişimine uyum saglayacak degisiklikleri yap!
router.put('/:id', LoggedIn, AsyncWrapper(async (req, res) => {
    const {id} = req.params;
    const item = await Item.findByIdAndUpdate(id, req.body, {runValidators:true});
    res.redirect(`/items/${item._id}`);
}))

router.delete('/:id', LoggedIn, AsyncWrapper(async (req, res) => {
    const {id} = req.params;
    await Item.findByIdAndDelete(id);
    res.redirect('/items');
}))


module.exports = router;