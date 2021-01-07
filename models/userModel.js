const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    email: { type: String, require: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    name: { type: String },
    lastName: { type: String }
})

module.exports = User = mongoose.model("user", userSchema)