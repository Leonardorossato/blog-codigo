const Sequelize = require('sequelize');
const sequelize = new Sequelize('blog-db', 'users', 'pass',{
    dialect: 'sqlite',
    host: 'blog-codigo.sqlite',
});

module.exports = sequelize