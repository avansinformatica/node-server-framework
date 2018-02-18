const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

let emailvalidator = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        validate: {
            validator: (email) => emailvalidator(email),
            message: 'Email must be valid.'
        },
        required: [true, 'Email is a required field.']
    },
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer than 2 characters.'
        },
        required: [true, 'Name is a required field.'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is a required field.'],
    },
    apikey: {
        type: String,
        unique: true,
        required: true
    }
});

// password hash
UserSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});

// UserSchema.path('email').validate((email) => {
//         var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//         return re.test(email);
//     },
//     'Email address must be valid.');


User = mongoose.model("User", UserSchema);
module.exports = User;