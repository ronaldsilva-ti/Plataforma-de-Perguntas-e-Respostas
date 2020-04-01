const Sequelize = require('sequelize');


const connection = new Sequelize('guiaPerguntas', 'root', '33363452', {
    host: 'localhost',
    dialect: 'mysql'
});


module.exports = connection;