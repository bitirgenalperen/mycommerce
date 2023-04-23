const express = require('express');
const router = express.Router({mergeParams: true});
const AsyncWrapper = require('../utils/AsyncWrapper');
const Item = require("../models/item");
const Review = require("../models/review");

// add a review
router.post('/', AsyncWrapper(async (req, res) => {
    const {itemId} = req.params;
    const item = await Item.findById(itemId);
    const {content, rating} = req.body;
    const review = new Review({content, rating});
    item.reviews.push(review);
    await review.save();
    await item.save();
    res.redirect(`/items/${itemId}`);
}))

router.get('/:reviewId/edit', AsyncWrapper(async (req, res) => {
    const {itemId, reviewId} = req.params;
    const review = await Review.findById(reviewId );
    res.render('reviews/edit', {review, itemId});
}))

router.put('/:reviewId', AsyncWrapper(async (req, res) => {
    const {itemId, reviewId} = req.params;
    const review = await Review.findByIdAndUpdate(reviewId, req.body, {runValidators:true});
    res.redirect(`/items/${itemId}`);
}))

// delete the review
router.delete('/:reviewId', AsyncWrapper(async (req, res) => {
    const {itemId, reviewId} = req.params;
    await Item.findByIdAndUpdate(itemId, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/items/${itemId}`);
}))

module.exports = router;