const express = require('express');
const router = express.Router();
const AsyncWrapper = require('../utils/AsyncWrapper');
const Item = require("../models/item");

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}



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

router.get("/new", (req, res) => {
    res.render('items/new');
    
})

router.post('/', AsyncWrapper(async (req, res) => {
    const {name, description, article, price, image} = req.body;
    // console.log(name, description, article, price, image);
    const newItem = new Item({name, description, article, price, image});
    await newItem.save();
    res.redirect(`/items/${newItem._id}/edit`);
}))

router.get('/:id', AsyncWrapper(async (req, res) => {
    const {id} = req.params;
    const item = await Item.findById(id).populate('reviews');
    res.render('items/show', {item});
}))

router.get('/:id/edit', AsyncWrapper(async (req, res) => {
    const {id} = req.params;
    const item = await Item.findById(id);
    res.render('items/edit', {item});
}))

// category değişimine uyum saglayacak degisiklikleri yap!
router.put('/:id', AsyncWrapper(async (req, res) => {
    const {id} = req.params;
    const item = await Item.findByIdAndUpdate(id, req.body, {runValidators:true});
    res.redirect(`/items/${item._id}`);
}))

router.delete('/:id', AsyncWrapper(async (req, res) => {
    const {id} = req.params;
    await Item.findByIdAndDelete(id);
    res.redirect('/items');
}))


module.exports = router;