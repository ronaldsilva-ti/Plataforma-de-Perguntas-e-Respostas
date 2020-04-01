const Sequelize = require('sequelize');
const connection = require("./database");

//Criação da tabela no Banco de Dadoss
var Resposta = connection.define('Respostas', {
    corpo: {
        type: Sequelize.TEXT,
        alowNull: false //Impede que esse campo receba valores nulos
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        alowNull: false
    }

});

//FORCE: FALSE -> Não vai forçar a criação da tabela caso ela exista 
Resposta.sync({ force: false });

module.exports = Resposta;