const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { hash } = require('bcrypt-nodejs');
const { stringify } = require('querystring');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, " Please enter an email"],
    unique: true,
    lowercase: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  phone: {
    type: String,
    //       required: true,
    unique: true
  },
  password: {
    type: String,
    //       required: true
  },
  // passwordResetToken: String,
  // passwordResetExpires: Date,
  // facebook_Account: String,
  // google_Account: String,
  // tokens: Array,
  authGoogleID: {
    type: String,
    default: null
  },
  authFacebookID: {
    type: String,
    default: null
  },
  authType: {
    type: String,
    enum: ['local', 'google', 'facebook'],
    default: 'local'
  },
  name: {
    type: String,
    default: null
  },
  gender: {
    type: String,
    default: null
  },
  birthday: {
    type: Date,
    default: null
  },
  address: {
    type: String,
    default: null
  },
  // avatar: {
  //     type: String,
  //     default: "/images/default.png"
  // },
  imageUrl: {
    type: String,
    default: null
  },
  imageId: {
    type: String,
    default: null
  },
  role: {
    type: Number,
    default: 0 //  admin:1 , NhanVien: 2, user: 0
  },
  notification: {
    type: Boolean,
    default: false
  },
  codeResetPassword: {
    type: String,
    default: null
  },
  // _id: mongoose.Schema.Types.ObjectId
  // username: {
  //     type: String,
  //     required :true
  // },
  // fullname: {
  //     type: String,
  //     required: true
  // },
  // phone: {
  //     type: String,
  //     required: true
  // },
  // address: {
  //     type: String, 
  //     required: true
  // }
}, { timestamps: true }
);

// Password Hash " Middleware ""
///////////////////////////
userSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

/**
 * Helper method for validating user's password.
 */
userSchema.methods.isValiPassWord = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};
const User = mongoose.model('User', userSchema);
module.exports = User;