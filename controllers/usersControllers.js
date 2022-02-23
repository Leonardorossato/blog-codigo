const Users = require('../models/Users');
const { InvalidArgumentError, InternalServerError } = require('../middleware/erros');

module.exports = {
  adiciona: async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
      const usuario = new Users({
        nome,
        email,
      });

      await usuario.addSenha(senha);

      await usuario.adiciona();

      res.status(201).json();
    } catch (erro) {
      if (erro instanceof InvalidArgumentError) {
        res.status(422).json({ erro: erro.message });
      } else if (erro instanceof InternalServerError) {
        res.status(500).json({ erro: erro.message });
      } else {
        res.status(500).json({ erro: erro.message });
      }
    }
  },

  login: (req, res) => {
    res.status(204).send()
  },

  lista: async (req, res) => {
    const usuarios = await Users.lista();
    res.json(usuarios);
  },

  deleta: async (req, res) => {
    const usuario = await Users.buscaPorId(req.params.id);
    try {
      await usuario.deleta();
      res.status(200).send();
    } catch (erro) {
      res.status(500).json({ erro: erro });
    }
  }
};
