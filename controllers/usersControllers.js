const Users = require('../models/Users');
const { InvalidArgumentError, InternalServerError } = require('../middleware/erros');
const jwt = require('jsonwebtoken')

const createTokenJWT = (usuario) =>{
  const payload = {
    id: usuario.id,
  }
  const token = jwt.sign(payload, 'senha')
  return token;
}

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
    const token = createTokenJWT(req.user)
    res.set('Authorization', token);
    res.status(204).send()
  },

  lista: async (req, res) => {
    const usuario = await Users.lista();
    res.json(usuario);
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
