import { Mongoose } from "mongoose";
const bcrypt = require("bcrypt");

const UserSchema = new Mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter a valid first name."]
    },
    lastName: {
      type: String,
      required: [true, "Please enter a valid last name."]
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      validate: {
        validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email."
      }
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minlength: [8, "Password must be 8 characters or longer."]
    }
  },
  { timestamps: true }
);

UserSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set(value => (this._confirmPassword = value));

UserSchema.pre("validate", function(next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Passwords do not match.");
  }
  next();
});

UserSchema.pre("save", function(next) {
  bcrypt.hash(this.password, 10).then(hash => {
    this.password = hash;
    next();
  });
});
