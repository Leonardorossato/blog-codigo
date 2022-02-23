const usersDao = require('../Data/usersDao');
const { InvalidArgumentError } = require('../middleware/erros');
const validations = require('../middleware/validations');

class Users {
  constructor(users) {
    this.id = users.id;
    this.nome = users.nome;
    this.email = users.email;
    this.senha = users.senha;

    this.valida();
  }

  async adiciona() {
    if (await Users.buscaPorEmail(this.email)) {
      throw new InvalidArgumentError('O usuário já existe!');
    }

    return usersDao.adiciona(this);
  }

  valida() {
    validations.campoStringNaoNulo(this.nome, 'nome');
    validations.campoStringNaoNulo(this.email, 'email');
    validations.campoStringNaoNulo(this.senha, 'senha');
    validations.campoTamanhoMinimo(this.senha, 'senha', 8);
    validations.campoTamanhoMaximo(this.senha, 'senha', 64);
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
}

module.exports = Users;
