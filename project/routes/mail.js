var express = require('express');
var mail = require('../service/mailService');
var router = express.Router();

router.post('/send', (req, res, next) => {
    let email = req.body.email;
    mail(email, res);    
});

router.post('/checkCode', (req, res, next) => {
    let code = req.body.code;
    console.log(req.session.emailCode);
    if(req.session.emailCode == code) {
        req.session.emailCode = 0;
        res.json({status: "OK"});
    } else {
        res.json({status: "False"});
    }
    res.end();
});


module.exports = router;