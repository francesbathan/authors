const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 3,
      required: [true, "Please enter a valid name."]
    }
  },
  { timestamps: true }
);

module.exports.Author = mongoose.model("Author", AuthorSchema);
