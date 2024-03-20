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
}

module.exports = NotesController;
