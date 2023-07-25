const passport = require('passport');
const { Strategy: KakaoStrategy } = require('passport-kakao');
const models = require('../models');

module.exports = () => {
    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_ID,
        callbackURL: '/rest/auth/kakao/callback',
    }, async (accessToken, refreshToken, profile, done) => {
        console.log('profile', profile);
        try {
            const exUser = await models.user.findOne({
                where: { user_snsId: profile.id, user_provider: 'kakao' }
            });
            if (exUser) {
                done(null, exUser);
            } else {
                const newUser = await models.user.create({
                    user_email: profile._json?.kakao_account?.email,
                    user_name: profile.displayName,
                    user_snsId: profile.id,
                    user_provider: 'kakao',
                });
                done(null, newUser);
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};