// 로그인 인증 된 사용자인지 확인
module.exports = (req, res, next) => {
    if (req.isAuthenticated())
      return next();
    res.redirect('/login');
  };