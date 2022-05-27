import LocalStrategy from 'passport-local';
import FacebookStrategy from 'passport-facebook';

import { User } from '../models/index.js';

// eslint-disable-next-line no-shadow
export default function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user._id);
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
        console.log('called');
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

          if (user) {
            user.passwordMatch(password, function (err, match) {
              if (err) {
                return done(err);
              }
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

  passport.use(
    'facebook',
    new FacebookStrategy.Strategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: `http://localhost:9000/api/v1/auth/facebook/callback`,
        profileFields: [
          'id',
          'profileUrl',
          'email',
          'displayName',
          'name',
          'gender',
          'picture.type(large)',
        ],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const fbProfile = profile?._json;
          const user = await User.findOne({
            provider_id: fbProfile.id,
            email: fbProfile.email,
          });

          if (user) {
            return done(null, user);
          }
          const randomString = Math.random().toString(36).substring(2);
          // store fb profile data to user
          const newUser = new User({
            username: fbProfile.email.split('@')[0],
            email: fbProfile.email,
            password: randomString,
            firstName: fbProfile.first_name,
            lastName: fbProfile.last_name,
            profilePicture: {
              url: fbProfile.picture ? fbProfile.picture.data.url : '',
            },
            provider_id: fbProfile.id,
            provider: 'facebook',
            provider_access_token: accessToken,
            provider_refresh_token: refreshToken,
          });
          newUser.save(function (err) {
            if (err) {
              return done(err);
            }
            return done(null, newUser);
          });
        } catch (err) {
          console.log(err);
          return done(err);
        }
      },
    ),
  );
}
