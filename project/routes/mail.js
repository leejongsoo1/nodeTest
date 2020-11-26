var express = require('express');
var mail = require('../service/mailService');
var router = express.Router();

var dice = 0;

router.post('/send', (req, res, next) => {
    let email = req.body.email;
    dice = mail(email, 'password');
    res.json({status: "OK"});
});

router.post('/checkCode', (req, res, next) => {
    let code = req.body.code;
    console.log(dice);
    if(dice == code) {
        dice = 0;
        res.json({status: "OK"});
    } else {
        res.json({status: "False"});
    }
    res.end();
});


module.exports = router;