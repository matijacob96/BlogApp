const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

//create Schema
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String }
}, { collection: 'user' });

const User = Mongoose.model('User', userSchema);

module.exports = User;