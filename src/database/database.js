const Sequelize = require('sequelize');

const connection = new Sequelize('stracetoask', 'root', '*****', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;