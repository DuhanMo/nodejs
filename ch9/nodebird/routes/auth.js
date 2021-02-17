const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

/**
 * 회원가입 라우터
 * 기존에 같은 이메일로 가입한 사용자가 있는지 조회
 * 있다면 회원가입페이지로 되돌려보냄, 주소뒤에 에러를 쿼리스트링으로 표시
 * 같은 이메일로 가입한 사용자가 없다면 비밀번호를 암호화하고 사용자 정보를 생성
 * 회원가입시 비밀번호 암호화 bcrypt 사용
 */
router.post('/join', isNotLoggedIn, async (req, res, next) => {
  const { email, nick, passport } = req.body;
  try {
    const exUser = await User.findOne( {where: { email }});
    if (exUser) {
      return res.redirect('/join?error=exist');
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.redirect('/');
  }catch(err) {
    console.error(err);
    return next(err);
  }
});
/**
 * 로그인 라우터
 * 로그인 요청이 들어오면 passport.authenticate('local') 미들웨어가 로컬로그인 전략을 수행
 * 전략이 성공하거나 실패하면 authenticate 메서드의 콜백함수 실행 ,콜백함수의 첫번째 매개변수(authErr) 값이 있다면 실패
 * 두번째 매개변수 값이 있다면 성공한것이고 req.login 메서드를 호출
 * Passport는 req 객체에 login과 logout 메서드를 추가함.
 * req.login은 passport.serializeUser를 호출
 * req.login에 제공하는 user 객체가 serializeUser 로 넘어가게 됨 
 */
router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/');
    });
  })(req, res, next);
});

/**
 * 로그아웃 라우터
 * req.logout 메서드는 req.user 객체를 제거하고,
 * req.session.destroy는 req.session 객체의 내용을 제거
 * 세션 정보를 지운 후 메인 페이지로 되돌아갑니다. 로그인이 헤제되어 있을 것
 */
router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;