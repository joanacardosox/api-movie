const { Router } = require("express");

const UserController = require("../controllers/UserController");

const usersRoutes = Router();

function myMiddleware(req, res, next) {
  console.log("Você passou pelo Middleware!");

  next();
}

const usersController = new UserController();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/:id", usersController.update);

module.exports = usersRoutes;
