const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email:{
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  admin:{
    type: Boolean,
    default: false
  },
  password:{
    type: String,
    required: true
  },
  image: {
    type: String,
  },
  reviews: {
    type: Schema.Types.ObjectId,
    ref: 'Review',
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;