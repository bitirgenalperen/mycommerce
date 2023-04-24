const mongoose = require('mongoose');

const { Schema } = mongoose;

// author required olmaması => problem
const reviewSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
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
    min:1,
    max:5,
    default:0
  },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;