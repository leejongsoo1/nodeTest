var express = require('express');
var passport = require('passport');

var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

// 로그인 페이지
router.get('/login', (req, res, next) => {
  let userEmail = '';
  if(req.cookies['loginEmail'] != undefined)
    userEmail = req.cookies['loginEmail'];

  res.render('login', { message: req.flash('error'), userEmail: userEmail });
});

// 로그인 기능
router.post('/login', passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true
  }),
  // 로그인 시 이메일 기억 기능 (쿠키)
  (req, res) => {
    if(req.body.rememberEmail == "on") {
      res.cookie('loginEmail', req.body.email);
    } else {
      res.cookie('loginEmail', '');
    }

    res.redirect('/');
  }
)

// 로그아웃 기능
router.get('/logout', (req, res, next) => {
  req.logOut();
  res.redirect('/');
});


// 패스워드 변경
router.get('/password', (req, res, next) => {
  res.render('password');
});

module.exports = router;
