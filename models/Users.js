const usuariosDao = require('./usuarios-dao');
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

    return usuariosDao.adiciona(this);
  }

  valida() {
    validations.campoStringNaoNulo(this.nome, 'nome');
    validations.campoStringNaoNulo(this.email, 'email');
    validations.campoStringNaoNulo(this.senha, 'senha');
    validations.campoTamanhoMinimo(this.senha, 'senha', 8);
    validations.campoTamanhoMaximo(this.senha, 'senha', 64);
  }

  
  async deleta() {
    return usuariosDao.deleta(this);
  }
  
  static async buscaPorId(id) {
    const usuario = await usuariosDao.buscaPorId(id);
    if (!usuario) {
      return null;
    }
    
    return new Usuario(usuario);
  }
  
  static async buscaPorEmail(email) {
    const usuario = await usuariosDao.buscaPorEmail(email);
    if (!usuario) {
      return null;
    }
    
    return new Usuario(usuario);
  }

  static lista() {
    return usuariosDao.lista();
  }
}

module.exports = Users;
