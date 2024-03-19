const { Router } = require("express");

const NotesMoviesController = require("../controllers/NotesMoviesController");

const notesMoviesRoutes = Router();

const notesController = new NotesMoviesController();

notesMoviesRoutes.post("/:user_id", notesController.create);

module.exports = notesMoviesRoutes;
