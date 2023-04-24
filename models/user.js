const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');
const Review = require('./review');
const { Schema } = mongoose;

const userSchema = new Schema({
  email:{
    type: String,
    required: true,
    unique: true
  }
});

userSchema.plugin(plm);

const User = mongoose.model('User', userSchema);

module.exports = User;