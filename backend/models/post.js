const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  userId: { type: String },
  message: { type: String, required: true },
  nom: { type: String },
  prenom: { type: String },
  picture: { type: String },
  date: { type: Date, default: Date.now },
  usersLiked: { type: Array, default: [] },
  usersComments: { type: Array, default: [] }
});

module.exports = mongoose.model("posts", postSchema);