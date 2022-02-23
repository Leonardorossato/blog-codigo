const db = require('../database/schema');

module.exports = {
  adiciona: post => {
    return new Promise((resolve, reject) => {
      db.run(
        `
        INSERT INTO posts (
          titulo, 
          conteudo
        ) VALUES (?, ?)
      `,
        [post.titulo, post.conteudo],
        erro => {
          if (erro) {
            return reject('Erro ao adicionar o post!');
          }

          return resolve();
        }
      );
    });
  },

  lista: () => {
    return new Promise((res, reject) => {
      db.all(`SELECT * FROM posts`, (erro, res) => {
        if (erro) {
          return reject('Erro ao listar os posts!');
        }

        return resolve(res);
      });
    });
  }
};
