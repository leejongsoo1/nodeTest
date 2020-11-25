var express = require('express');
var router = express.Router();

// 회원가입 페이지
router.get('/register', (req, res, next) => {
  res.render('userRegister');
});

module.exports = router;
