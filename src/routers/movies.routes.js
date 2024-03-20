const { Router } = require("express");

const NotesController = require("../controllers/NotesController");

const moviesRoutes = Router();

const moviesController = new NotesController();

moviesRoutes.get("/", moviesController.index);
moviesRoutes.post("/:user_id", moviesController.create);
moviesRoutes.get("/:id", moviesController.show);
moviesRoutes.delete("/:id", moviesController.delete);

module.exports = moviesRoutes;
