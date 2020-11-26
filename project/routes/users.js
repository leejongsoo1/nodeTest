var express = require('express');
var uService = require('../service/userService');
var isAuthenticated = require('../service/isAuth');

var router = express.Router();

// 회원가입 페이지
router.get('/register', (req, res, next) => {
  res.render('userRegister');
});

// 회원가입 POST
router.post('/register', (req, res, next) => {
  let body = req.body;
  let data = {
    email: body.email,
    password: body.password,
    name: body.name,
    nickName: body.nickName,
    reg_date: new Date(),
    authority: 'ROLE_USER'
  }

  uService.registerUser(data, res);
  
});

// 이메일 체크
router.post('/emailCheck', (req, res, next) => {
  let email = req.body.userEmail;
  uService.findUser(email, res); 
});


// 마이페이지
router.get('/mypage', isAuthenticated, (req, res, next) => {
  res.render('mypage');
});


module.exports = router;
