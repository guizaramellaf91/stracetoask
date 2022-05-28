const express = require('express');
const Question = require('../questions/Question');
const Answer = require('./Answer');
const router = express.Router();

router.get("/answer/:id", (req, res) => {
    var id = req.params.id;
    Question.findOne({
        where: { id: id }
    }).then(question => {
        if (question != undefined) {
            Answer.findAll({
                where: { questionId: question.id },
                order: [['id', 'desc']]
            }).then(answers => {
                res.render("answer", {
                    question: question,
                    answers: answers
                });
            }).catch((err) => {
                console.log(err);
            });
        } else {
            res.redirect("/");
        }
    }).catch((err) => {
        console.log(err);
    });
});

router.post("/answer", (req, res) => {
    var answerText = req.body.answerText;
    var questionId = req.body.question;
    Answer.create({
        answerText: answerText,
        questionId: questionId
    }).then(() => {
        res.redirect("/answer/" + questionId);
    }).catch((err) => {
        console.log(err);
    });
});

module.exports = router;