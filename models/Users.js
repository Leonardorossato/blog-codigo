const usersDao = require('../Data/usersDao');
const { InvalidArgumentError } = require('../middleware/erros');
const validations = require('../middleware/validations');
const bcrypt = require('bcrypt')

class Users {
  constructor(users) {
    this.id = users.id;
    this.nome = users.nome;
    this.email = users.email;
    this.senhaHash = users.senhaHash;

    this.valida();
  }

  async adiciona() {
    if (await Users.buscaPorEmail(this.email)) {
      throw new InvalidArgumentError('O usuário já existe!');
    }

    return usersDao.adiciona(this);
  }

  async addSenha(senha) {
    validations.campoStringNaoNulo(senha, 'senha');
    validations.campoTamanhoMinimo(senha, 'senha', 8);
    validations.campoTamanhoMaximo(senha, 'senha', 64);

    this.senhaHash = await Users.gerarSenhaHash(senha)
  }

  valida() {
    validations.campoStringNaoNulo(this.nome, 'nome');
    validations.campoStringNaoNulo(this.email, 'email');
  }

  
  async deleta() {
    return usersDao.deleta(this);
  }
  
  static async buscaPorId(id) {
    const usuario = await usersDao.buscaPorId(id);
    if (!usuario) {
      return null;
    }
    
    return new Users(usuario);
  }
  
  static async buscaPorEmail(email) {
    const usuario = await usersDao.buscaPorEmail(email);
    if (!usuario) {
      return null;
    }
    
    return new Users(usuario);
  }

  static lista() {
    return usersDao.lista();
  }

  static gerarSenhaHash(senha) {
    const custoHash = 12
    return bcrypt.hash(senha, custoHash)
  }

}

module.exports = Users;
