const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const user_Schema = mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        name: {
            type: String,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

/*-------------------------------------------
*  plain text password를 hashing
-------------------------------------------*/
user_Schema.pre("save", function (next) {
    var user = this;

    // salt 생성 / (default 10) 숫자가 높아질수록 해시를 생성하고 검증하는 시간 느려짐
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);

        // hash의 첫번째 인자 - 비밀번호의 plain Text
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

/*-------------------------------------------
*  hashing된 password를 받아온 plain text password와 비교
-------------------------------------------*/
user_Schema.methods.comparePassword = function (password, hash) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

const User = mongoose.model("User", user_Schema);

module.exports = User;
