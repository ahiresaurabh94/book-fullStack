const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName: {type:String , unique:true},
    password:{type:String , required:true},
    confirmPassword:{type:String}
})

const userModel = mongoose.model('users', UserSchema)

module.exports = userModel; 