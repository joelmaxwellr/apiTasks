const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlenght: 6,
        validate(value) {
            if(value.includes('123456')) {
                throw new Error('Password inseguro')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User