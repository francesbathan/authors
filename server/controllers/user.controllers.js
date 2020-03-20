const { User } = require("../models/users.model");

register: (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.json({ msg: "success", user: user });
    })
    .catch(err => res.json(err));
};

module.exports.createUser = (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  User.create({
    firstName,
    lastName,
    email,
    password
  })
    .then(user => res.json(user))
    .catch(err => res.status(400).json(err));
};
