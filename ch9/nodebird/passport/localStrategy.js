const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const { noExtendLeft } = require('sequelize/types/lib/operators');

module.exports = () => {
  /**
   * LocalStrategy 생성자의 첫 번째 인수로 주어진 객체는 전략에 관란 설정을 하는곳
   * usernameField와 passwordField에는 일치하는 로그인 라우터의 req.body속성명을 적으면 됨
   * req.body.email에 이메일 주소가
   * req.body.password에 비밀번호가 담겨들어오므로 email과 password를 각각 넣음
   */
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async (email, password, done) => {
    try {
      const exUser = await User.findOne({ where: { email } });
      if (exUser) {
        const result = await bcrypt.compare(password, exUser.password);
        if (result) {
          done(null, exUser);
        } else {
          done(null, false, { message: '비밀번호가 일치하지 않습니다.'});
        }
      } else {
        done(null, false, { message: '가입되지 않은 회원입니다.'});
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};