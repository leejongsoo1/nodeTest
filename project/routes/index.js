var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

// 로그인 페이지
router.get('/login', (req, res, next) => {
  res.render('login');
});


module.exports = router;
