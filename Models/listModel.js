const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const ListSchema = new Schema({
    title: {type:String , unique:true},
    isbn:{type:String , required:true},
    author:{type:String},
    description:{type:String},
    publishedDate:{type:String},
    publisher:{type:String},
})

const userModel = mongoose.model('lists', ListSchema)

module.exports = userModel; 