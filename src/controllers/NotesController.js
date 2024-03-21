const knex = require("../database/knex");

class NotesController {
  async create(req, res) {
    try {
      const { title, description, rating, tags } = req.body;
      const { user_id } = req.params;

      const [note_id] = await knex("movies_notes").insert({
        title,
        description,
        rating,
        user_id,
      });

      const tagsInsert = tags.map((name) => {
        return {
          note_id,
          name,
          user_id,
        };
      });

      await knex("tags").insert(tagsInsert);

      res.json("Nota criada com sucesso!");
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ status: "error", message: "Internal server error" });
    }
  }

  async show(req, res) {
    const { id } = req.params;

    const movie = await knex("movies_notes").where({ id }).first();
    const tags = await knex("tags").where({ note_id: id }).orderBy("name");

    return res.json({
      ...movie,
      tags,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    await knex("movies_notes").where({ id }).delete();

    return res.json();
  }

  async index(req, res) {
    try {
      const { title, user_id, tags } = req.query;

      let movies;

      if (tags) {
        const filterTags = tags.split(",").map((tag) => tag.trim());

        movies = await knex("tags")
          .select([
            "movies_notes.id",
            "movies_notes.title",
            "movies_notes.user_id",
          ])
          .where("movies_notes.user_id", user_id)
          .innerJoin("movies_notes", "movies_notes.id", "tags.note_id");
      } else {
        movies = await knex("movies_notes")
          .where({ user_id })
          .where("title", "like", `%${title}%`)
          .orderBy("title");
      }
      return res.json(movies);
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = NotesController;
