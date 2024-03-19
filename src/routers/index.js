const { Router } = require("express");

const usersRoutes = require("./users.routes");
const notesMoviesRoutes = require("./notes.routes");

const routes = Router();
routes.use("/users", usersRoutes);
routes.use("/notes", notesMoviesRoutes);

module.exports = routes;
