const express = require('express');
let port = 8080;
const app = express();
const bodyParser = require('body-parser');
const Answer = require('./src/modules/answers/Answer');
const Question = require('./src/modules/questions/Question');
const askController = require('./src/modules/answers/AnswerController');
const questionController = require('./src/modules/questions/questionController');
const connection = require('./src/database/database');
connection.authenticate().then(() =>
    console.log('connected to db.')).catch((err) => { console.log(err); });
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', askController);
app.use('/', questionController);

app.get("/", (req, res) => {
    Question.findAll({
        raw: true, order: [
            ['id', 'desc']
        ]
    }).then((questions) => {
        Answer.findAll({
            raw: true
        }).then((answers) => {
            res.render("index", {
                questions: questions,
                answers: answers
            });
        })
    })
});

app.listen(port, () => {
    console.log(`api started on port ${port}`);
});