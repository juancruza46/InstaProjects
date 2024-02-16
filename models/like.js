const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  postId: String,
  userId: String,
});

module.exports = mongoose.model('Like', likeSchema);
