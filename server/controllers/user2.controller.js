const bcrypt = require("bcrypt");
const User = require("../models/user2.model");
const jwt = require("jsonwebtoken");

module.exports = {
  register(req, res) {
    User.create(req.body)
      .then(newUser => {
        const token = jwt.sign(
          {
            id: newUser._id,
            email: newUser.email
          },
          process.env.SECRET_KEY
        );
        res.cookie("token", token, {
          httpOnly: true
        });
        res.json({ status: "Success", token });
      })
      .catch(err => res.status(400).json(err));
  },

  async login(req, res) {
    const { email, password } = req.body;

    const errorMessage = "Incorrect login. Try again.";

    try {
      const user = await User.findOne({ email });
      if (user == null) {
        throw new Error(errorMessage);
      }
      const result = await bcrypt.compare(password, user.password);

      if (result == false) {
        throw new Error(errorMessage);
      }
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email
        },
        process.env.SECRET_KEY
      );
      res.cookie("token", token, {
        httpOnly: true
      });
      res.json({ status: "Success", token });
    } catch (event) {
      res.status(400).json({ message: errorMessage });
    }
  },

  logout(_, res) {
    res.clearCookie("token");
    res.json({ status: "Success" });
  }
};
