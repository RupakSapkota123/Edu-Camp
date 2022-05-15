import LocalStrategy from 'passport-local';

import { User } from '../schema/index.js';

// eslint-disable-next-line no-shadow
export default function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user._id);
    console.log('SERIALIZE', user);
  });

  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      if (err) {
        console.log('ERR', err);
        return done(err);
      }
      done(err, user);
    });
  });

  passport.use(
    'local-register',
    new LocalStrategy.Strategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      function (req, email, password, done) {
        User.findOne({ email }).then((user) => {
          if (user) {
            return done(null, false, {
              message: 'Email already has been already used by other user.',
            });
          }

          const { firstName } = req.body;
          const { lastName } = req.body;
          const { username } = req.body;

          const newUser = new User({
            email,
            password,
            username,
            firstName,
            lastName,
          });

          newUser.save(function (err) {
            if (err) {
              return done(err);
            }
            return done(null, newUser);
          });
        });
      },
    ),
  );

  passport.use(
    'local-login',
    new LocalStrategy.Strategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        try {
          const user = await User.findOne({ username });

          console.log('USER', password);

          if (user) {
            user.isPasswordMatch(password, function (err, match) {
              if (err) {
                return done(err);
              }
              console.log('MATCH=User', match);
              if (match) {
                return done(null, user);
              }
              return done(null, false, {
                message: 'Incorrect credentials pass.',
              });
            });
          } else {
            return done(null, false, { message: 'Incorrect credentials.' });
          }
        } catch (err) {
          return done(err);
        }
      },
    ),
  );
}
