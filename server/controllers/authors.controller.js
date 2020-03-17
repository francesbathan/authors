const { Author } = require("../models/authors.model");

module.exports.index = (_, res) => {
  res.json({
    message: "Authors Database"
  });
};

module.exports.createAuthor = (req, res) => {
  const { name } = req.body;
  Author.create({
    name
  })
    .then(author => res.json(author))
    .catch(err => res.json(err));
};

module.exports.allAuthors = (_, res) => {
  Author.find({})
    .then(authors => res.json(authors))
    .catch(err => res.json(err));
};

module.exports.findAuthor = (req, res) => {
  Author.findById({ _id: req.params.id })
    .then(author => res.json(author))
    .catch(err => res.json(err));
};
