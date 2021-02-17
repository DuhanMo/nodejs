const passport = require('passport');
const KakaoStrategy = require('passport').Strategy;

const User = require('../models/user');
module.exports = () => {
  passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_ID,
    callbackURL: '/auth/kakao/callback',

  }, async (accessToken, refreshToen, profile, done) => {
    console.log('kakao profile', profile);
    try {
      const exUser = await User.findOne({
        where: { snsId: profile.id, provider: 'kakao'},
      })
    } catch (error) {
      console.error(error);
      done(error);
    }
  }
  ))

}