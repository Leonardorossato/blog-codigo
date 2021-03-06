const postsDao = require('../Data/postsDao');
const validations = require('../middleware/validations');

class Posts {
  constructor(post) {
    this.titulo = post.titulo;
    this.conteudo = post.conteudo;
    this.valida();
  }

  adiciona() {
    return postsDao.adiciona(this);
  }

  valida() {
    validations.campoStringNaoNulo(this.titulo, 'título');
    validations.campoTamanhoMinimo(this.titulo, 'título', 5);

    validations.campoStringNaoNulo(this.conteudo, 'conteúdo');
    validations.campoTamanhoMaximo(this.conteudo, 'conteúdo', 140);
  }

  static lista() {
    return postsDao.lista();
  }
}

module.exports = Posts;
