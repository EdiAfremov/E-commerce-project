
// const jwt = require('jsonwebtoken')
// var mongoose = require('mongoose')
// const validator = require('validator');
// const _ = require('lodash')
// const bcrypt = require('bcryptjs')

// var Schema = mongoose.Schema;

// var userSchema = new Schema({
//     email: {
//         type: String,
//         required: true,
//         minlength: 1,
//         trim: true,
//         unique: true,
//         validate: {
//             validator: validator.isEmail,
//             message: '{VALUE} is not valid email'
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         minlength: 6
//     },
//     tokens: [{
//         access: {
//             type: String,
//             required: true,
//         },
//         token: {
//             type: String,
//             required: true,
//         }
//     }]

// })
// userSchema.methods.toJSON = function () {
//     var user = this;
//     var userObject = user.toObject();
//     return _.pick(userObject, ['_id', 'email'])
// }

// userSchema.methods.generateAuthToken = function () {
//     var user = this;
//     var access = 'auth'
//     var token = jwt.sign({ _id: user._id.toHexString(), access }, 'abc123').toString()
//     user.tokens.push({ access, token })

//     return user.save().then(() => token)
// }

// userSchema.statics.findByToken = function (token) {
//     var User = this;
//     var decoded;

//     try {
//         decoded = jwt.verify(token, 'abc123')
//     } catch (e) {
//         return Promise.reject()
//     }
//     return User.findOne({
//         '_id': decoded._id,
//         'tokens.token': token,
//         'tokens.access': 'auth'
//     })
// }

// userSchema.statics.findByCredentials = function (email, password) {
//     var User = this;

//     return User.findOne({ email }).then((user) => {
//         if (!user) {
//             return Promise.reject();
//         }

//         return new Promise((resolve, reject) => {
//             bcrypt.compare(password, user.password, (err, result) => {
//                 if (result) {
//                     resolve(user)
//                 } else {
//                     reject()
//                 }
//             })
//         })
//     })
// }


// userSchema.pre('save', function (next) {
//     var user = this;

//     if (user.isModified('password')) {

//         bcrypt.genSalt(10, (err, salt) => {
//             bcrypt.hash(user.password, salt, (err, hash) => {
//                 user.password = hash;
//                 next()
//             })
//         })
//     } else {
//         next()
//     }
// })
// userSchema.methods.removeToken = function (token) {
//     var user = this;
//     return user.update({
//         $pull: {
//             tokens: {
//                 token: token
//             }
//         }
//     })
// }


// var User = mongoose.model('User', userSchema);


// module.exports = { User }