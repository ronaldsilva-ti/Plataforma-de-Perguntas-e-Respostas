const Sequelize = require('sequelize');
const connection = require("./database");

var Pergunta = connection.define('Pergunta', { //Criando tabela no SQL
    titulo: {
        type: Sequelize.STRING,
        alowNull: false //Impede que esse campo receba valores nulos
    },
    description: {
        type: Sequelize.TEXT,
        alowNull: false //Impede que esse campo receba valores nulos
    }

});

//FORCE: FALSE -> Não vai forçar a criação da tabela caso ela exista   
Pergunta.sync({ force: false }).then(() => {
    console.log("Tabela Criada!");
});

module.exports = Pergunta;