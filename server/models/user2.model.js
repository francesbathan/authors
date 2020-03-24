const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minlength: [2, "Please enter a valid name."]
    },
    email: {
      type: String,
      unique: true,
      validate: [
        val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        "Please enter a valid email."
      ]
    },
    password: {
      type: String,
      minlength: [8, "Password must be 8 or more characters."]
    }
  },
  { timestamps: true }
);

UserSchema.virtual("passwordConfirmation", {
  get: () => this._passwordConfirmation,
  set: val => (this._passwordConfirmation = val)
});

UserSchema.pre("validate", function(next) {
  if (this.password !== this.passwordConfirmation) {
    this.invalidate("passwordConfirmation", "Passwords do not match.");
  }
  next();
});

UserSchema.pre("save", function(next) {
  bcrypt.hash(this.password, 10).then(hashedPassword => {
    this.password = hashedPassword;
    next();
  });
});

module.exports = mongoose.model("User", UserSchema);
