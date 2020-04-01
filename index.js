const express = require("express");
const app = express();

const bodyParser = require("body-parser"); //npm install body-parser --save
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

//DATABASE
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados");
    })
    .catch((msgError) => {
        console.log(msgError);

    })


//Estou dizendo para o express usar o EJS com view engine
app.set('view engine', 'ejs');
//arquivo estaticos(html,css)
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//-----------------------------Rotas

app.get("/", (req, res) => {
    Pergunta.findAll({
        raw: true,
        order: [
                ['id', 'DESC']
            ] //ASC->Crescente
    }).then(perguntas => { // raw: true -> Pesquisa crua, so trazer os dados
        res.render("index", {
            perguntas: perguntas //listar peguntas
        });
    });

});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

//Pega do formulario
app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    Pergunta.create({ //INSERT
        titulo: titulo,
        description: descricao
    }).then(() => {
        res.redirect("/");

    });
});

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: { id: id } //Onde o id do parametro é igual ao id da tabela
    }).then(pergunta => { //then-> função q vai ser rodada após a pesquisa
        if (pergunta != undefined) { //siginifica que a pergunta foi encontrada
            Resposta.findAll({
                where: { perguntaId: pergunta.id },
                order: [
                    ['id', 'DESC']
                ]

            }).then(respostas => {
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
                });

            });
        } else { //Não encontrada
            res.redirect("/");
        }
    });
});

app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({ //INSERT
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId);

    });

});




//CRIAR SERVIDOR
app.listen(8080, () => { console.log("App rodando"); });