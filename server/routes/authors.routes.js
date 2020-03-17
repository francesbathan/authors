const AuthorController = require("../controllers/authors.controller");

module.exports = function(app) {
  app.get("/api", AuthorController.index);
  app.get("/api/authors", AuthorController.allAuthors);
  app.get("/api/authors/:id", AuthorController.findAuthor);
  app.post("/api/new", AuthorController.createAuthor);
};
