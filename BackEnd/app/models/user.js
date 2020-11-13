const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { hash } = require('bcrypt-nodejs');

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
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    facebook_Account: String,
    google_Account: String,
    tokens: Array,
    name: {
        type: String,
        default: null
    },
    gender: {
        type: String,
        default: null
    },
    birthday: {
        type: String,
        default: null
    },
    address: {
        type: String,
        default: null
    },
    avatar: {
        type: String,
        default: "/images/default.png"
    },
    role: {
        type: Number,
        default: 2 //  admin:1 , NhanVien: 2, user: 0
    }
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
    try{
        return await bcrypt.compare(newPassword, this.password);
    }catch(error) {
        throw new Error(error);
    }
};
const User = mongoose.model('User', userSchema);
module.exports = User;