const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;

const users = [{
    id: 1,
    username: 'admin',
    password: '$2y$10$A0wD7dlMHgJib1Is/aEYYOUSLD.7lqsKLgfw/rLRGS0ZyMmqCcr6.' // 'admin'
}];

module.exports = function(passport) {
    passport.use(
        new localStrategy((username, password, done) => {
            const user = users.find(user => user.username === username);
            if (!user) return done(null, false);           
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) throw err;
                if (result === true) {
                  return done(null, user);
                } else {
                  return done(null, false);
                }
            });
        })
    );

    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });
    passport.deserializeUser((id, cb) => {
        const user = users.find(user => user.id === id);
        cb(null, user);
    });
};