const { Router } = require("express");

const NotesController = require("../controllers/NotesController");

const moviesRoutes = Router();

const moviesController = new NotesController();

moviesRoutes.post("/:user_id", moviesController.create);
moviesRoutes.get("/:id", moviesController.show);

module.exports = moviesRoutes;
