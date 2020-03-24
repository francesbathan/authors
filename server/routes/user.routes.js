const usersController = require("../controllers/user2.controller");

module.exports = app => {
  app.post("/api/users", usersController.register);
  app.post("/api/users/login", usersController.login);
  app.delete("/api/users/logout", usersController.logout);
  // app.post("/api/register", Users.register);
  // app.post("/api/login", Users.login);
  // app.get("/api/users", authenticate, Users.getAll);
};
