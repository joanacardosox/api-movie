const AppError = require("../utils/AppError");
const bcrypt = require("bcrypt");
const knex = require("../database/knex");

class UserController {
  async create(req, res) {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await knex("users").insert({
      name,
      email,
      password: hashedPassword,
    });

    res.json();
  }

  async update(req, res) {
    const { name, email, password, old_password } = req.body; // Adiciona password ao objeto
    const id = req.params.id; // Certifique-se de que o ID está sendo corretamente obtido

    try {
      const user = await knex("users").where({ id }).first();

      if (!user) {
        throw new AppError("Usuário não encontrado", 404);
      }

      // Verifica se o e-mail foi alterado e se já existe no banco de dados
      if (email && email !== user.email) {
        const userWithUpdatedEmail = await knex("users")
          .where({ email })
          .first();

        if (userWithUpdatedEmail) {
          throw new AppError("Este e-mail já está em uso!", 400);
        }
      }

      // Criptografa a nova senha se fornecida
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }

      if (password && !old_password) {
        throw new AppError(
          "Você tem que informar a senha antiga para definir a senha!"
        );
      }

      // Atualiza o nome e o e-mail (se alterados)
      user.name = name || user.name;
      user.email = email || user.email;

      // Atualiza o usuário no banco de dados
      await knex("users").where({ id }).update({
        name: user.name,
        email: user.email,
        password: user.password, // Atualiza a senha se fornecida
        updated_at: knex.fn.now(),
      });

      res.status(200).json({ message: "Usuário atualizado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao atualizar o usuário" });
    }
  }
}

module.exports = UserController;
