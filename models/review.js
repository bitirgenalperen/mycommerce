const mongoose = require('mongoose');

const { Schema } = mongoose;

const reviewSchema = new Schema({
  author: {
    type: String,
    ref: 'User',
    trim: true,
  },
  content: {
    type: String,
  },
  date:{
    type: Date,
    default: Date.now
  },
  rating: {
    type: Number,
    min:0,
    max:5,
    default:0
  },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;