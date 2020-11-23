const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');


// Login WITH JWT
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
  secretOrKey: process.env.JWT_KEY
}, async (payload, done) => {
  try {
    // console.log('payload', payload)
    const email = payload.sub;
    //console.log(email);
    const user = await User.findOne({ email })

    // nếu ko tìm thấy user 
    if (!user) {
      return done(null, false);
    }
    // Ok HẾT RỒI THÌ TRẢ LẠI USER
    done(null, user);
  } catch (error) {
    done(error, false)
  }
}))


// FOR LOGIN LOCAL
passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });

    // NẾU KO TÌM THẤY USER
    if (!user) {
      return done(null, false, { message: `Email ${email} not found.` });
    }
    // Kiểm tra email và password
    const isCorrectPassword = await user.isValiPassWord(password);
    if (!isCorrectPassword) {
      return done(null, false, { message: 'Invalid email or password.' });
    }
    done(null, user);

  } catch (error) {
    done(error, false, { message: 'Invalid email or password.' });
  }

}));



// passport.use(new LocalStrategy(
//   function (username, password, done) {
//     User.findOne({ email: email }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   }
// ));

// LOGIN FOR GOOGLE
passport.use(new GooglePlusTokenStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // console.log('accessToken', accessToken);
    // console.log('refreshToken', refreshToken);
    // console.log('profile', profile);

    // KIỂM TRA TÀI KHOẢN GOOGLE ĐÃ TỒN TẠI TRONG DATABSE HAY CHƯA
    const user = await User.findOne({
      authGoogleID: profile.id,
      authType: 'google'
    });

    if (user) {
      return done(null, user);
    }

    // NẾU LẦN ĐẦU ĐĂNG NHẬP THÌ TẠO MỚI

    const newUser = new User({
      authType: 'google',
      authGoogleID: profile.id,
      email: profile.emails[0].value,
      role: 0,
      name: profile.displayName
    });
    await newUser.save();
    done(null, newUser);

  } catch (error) {
    done(error, false)
  }
}))

// LOGIN FOR FACEBOOK
passport.use(new FacebookTokenStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    console.log('profile', profile);

    // KIỂM TRA TÀI KHOẢN FACEBOOK ĐÃ TỒN TẠI TRONG DATABSE HAY CHƯA
    const user = await User.findOne({
      authFacebookID: profile.id,
      authType: 'facebook'
    });

    if (user) {
      return done(null, user);
    }

    // NẾU LẦN ĐẦU ĐĂNG NHẬP THÌ TẠO MỚI

    const newUser = new User({
      authType: 'facebook',
      authFacebookID: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName,
      role: 0
    });
    await newUser.save();
    done(null, newUser);

  } catch (error) {
    done(error, false)
  }
}))


passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  user.findById(id, function (err, user) {
    cb(err, user);
  });
});

