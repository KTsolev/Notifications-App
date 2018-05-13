const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Notifications  = new Schema({
  type: String,
  image: String,
  title: String,
  text: String,
  requirement: String,
  expires: Number,
});

module.exports = mongoose.model('Notifications', Notifications);
