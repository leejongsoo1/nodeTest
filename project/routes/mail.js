var express = require('express');
var mail = require('../service/mail');
var router = express.Router();

router.post('/send', (req, res, next) => {
    let email = req.body.email;
    mail(email, 'password');
});

module.exports = router;