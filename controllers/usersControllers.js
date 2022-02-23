const Users = require('../models/Users');
const { InvalidArgumentError, InternalServerError } = require('../middleware/erros');
const jwt = require('jsonwebtoken')

const createTokenJWT = (users) =>{
  const payload = {
    id: users.id,
  }
  const token = jwt.sign(payload, 'senha')
  return token;
}

module.exports = {
  adiciona: async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
      const users = new Users({
        nome,
        email,
      });

      await users.addSenha(senha);

      await users.adiciona();

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
    const token = createTokenJWT(req.users)
    res.set('Authorization', token);
    res.status(204).send()
  },

  lista: async (req, res) => {
    const users = await Users.lista();
    res.json(users);
  },

  deleta: async (req, res) => {
    const users = await Users.buscaPorId(req.params.id);
    try {
      await users.deleta();
      res.status(200).send();
    } catch (erro) {
      res.status(500).json({ erro: erro });
    }
  }
};
