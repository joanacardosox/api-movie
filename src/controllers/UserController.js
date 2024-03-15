const AppError = require("../utils/AppError");

const knex = require("../database/knex");

class UserController {
  async create(req, res) {
    const { name, email, password } = req.body;

    const userId = await knex("users").insert({
      name,
      email,
      password,
    });

    res.json();
  }
}

module.exports = UserController;
