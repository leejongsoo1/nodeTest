var express = require('express');
var uService = require('../service/userService');

var router = express.Router();

// 회원가입 페이지
router.get('/register', (req, res, next) => {
  res.render('userRegister');
});

// 회원가입 POST
router.post('/register', (req, res, next) => {
  let body = req.body;
  let email = body.email;
  let password = body.password;
  let name = body.name;
  let nickName = body.nickName;

  let data = {
    email: email,
    password: password,
    name: name,
    nickName: nickName
  }

  uService.registerUser(data, res);
  
});


module.exports = router;
