const mongoose = require('mongoose');
const cryptoJs = require('crypto-js');
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 64,
    },
    isAdmin: { type: Boolean, default: false },

   



},
    {
     timestamps:true,
 }
);
module.exports= mongoose.model('User', userSchema);