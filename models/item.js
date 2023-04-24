const mongoose = require('mongoose');
const Review = require('./review');

const { Schema } = mongoose;

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  article: {
    type: String,
    required: true,
    enum: ['clothing', 'oem', 'monitor', 'snack']
  },
  size: {
    type: String,
    required: false
  },
  color: {
    type: String,
    required: false
  },
  spec: {
    type: Number,
    required: false
  },
  price:{
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  seller: {
    type: String,
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
    required: true,
  },
  reviews: [
    {    
      type: Schema.Types.ObjectId,
      ref: 'Review',
    },
  ]

});

itemSchema.post('findOneAndDelete', async function (entry) {
  if(entry){
    await Review.deleteMany({
      _id: {
        $in: entry.reviews
      }
    })
  }
})

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;