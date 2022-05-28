const express = require('express');
const router = express.Router();
const Question = require('./Question');

router.get("/question", (req, res) => {
    res.render("question");
});

router.post("/savequestion", (req, res) => {
    var title = req.body.title;
    var description = req.body.description;
    Question.create({
        title: title,
        description: description
    }).then(() => {
        res.redirect("/");
    }).catch((err) => {
        console.log(err);
    });
});

module.exports = router;