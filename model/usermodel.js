const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName:{type:String,require:true,},
    email:{type:String,require:true,},
    mobileno:{type:String,require:true,},
});

const User = mongoose.model("user",userSchema);

module.exports = User;