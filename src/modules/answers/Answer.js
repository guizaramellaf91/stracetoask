const Sequelize = require('sequelize');
const connection = require('../../database/database');

const Answer = connection.define('answers', {
    answerText: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    questionId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Answer.sync({ force: false }).then(() => { });

module.exports = Answer;