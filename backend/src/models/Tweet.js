const mongoose = require("mongoose");

const TweetSchema = new mongoose.Schema({
  author: String,
  content: String,
  emotion: {
    score: Number,
    emotion: String
  },
  likes: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Tweet", TweetSchema);
