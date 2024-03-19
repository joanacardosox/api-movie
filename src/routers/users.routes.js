const { Router } = require("express");

const UserController = require("../controllers/UserController");

const usersRoutes = Router();

const usersController = new UserController();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/:id", usersController.update);
usersRoutes.delete("/:user_id", usersController.delete);

module.exports = usersRoutes;
