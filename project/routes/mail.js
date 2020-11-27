var express = require('express');
var mail = require('../service/mailService');
var router = express.Router();

// 메일 전송
router.post('/send', (req, res, next) => {
    let email = req.body.email;
    var dice = getRandomInt(111111, 999999);
    req.session.emailCode = dice;
    mail(email, res, dice);
});

// session code 값 비교
router.post('/checkCode', (req, res, next) => {
    let code = req.body.code;
    if(req.session.emailCode == code) {
        delete req.session.emailCode;
        res.json({status: "OK"});        
    } else {
        res.json({status: "False"});
    }
});

var getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

module.exports = router;