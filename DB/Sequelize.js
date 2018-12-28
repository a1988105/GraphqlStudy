const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  // SQLite only
  storage: './database.sqlite'
});

const Users = sequelize.define('users', {
  Name: {
    type: Sequelize.STRING
  }
});
const Posts = sequelize.define('posts',{
  Title: {
    type : Sequelize.STRING
  },
  Body : {
    type  : Sequelize.STRING
  },
  AuthorId : {
    type : Sequelize.INTEGER
  },
})

Users.sync({force: true}).then(() => {
  return Users.create({
    ID  : 1,
    Name: 'Eric'
  });
});

Posts.sync({force: true}).then(() => {
  return Posts.create({
    Title     : 'My first post',
    Body      : 'body......',
    AuthorId  : 1
  });
});

module.exports = sequelize;