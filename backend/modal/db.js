const {model, Schema } = require('mongoose');
const mongoose = require('mongoose');
const con = process.env.CONNECTION_STRING;
mongoose.connect(con).then(()=> console.log("connected"));

const userSchema = new Schema({
    username : {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    password: {
        type: String,
        length: 6,
        required: true
    },
    firstname:{
        type : String,
        required: true,
        trim: true,
        maxLength: 30
    },
    lastname:{
        type: String,
        maxLength: 40
    } 
});
const accountSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    balance: {
        type: Number,
        default: 0
    }
});

const User = model('User', userSchema);
const Accounts = model('Accounts', accountSchema);

module.exports = { User, Accounts };
