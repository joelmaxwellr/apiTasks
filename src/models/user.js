const mongoose = require('mongoose')
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

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
        minlenght: [8, "minimo 8 Caracteres"],
        validate(value) {
            if(value.includes('123456')) {
                throw new Error('Password inseguro')
            }
        }
    },
    email: {
        type: String,
        unique:true,
        required: true,
        trim: true,
        lowercase: true,
        validete(value){
            if(!validator.isEmail(value)){
                throw new Error("Email Incorrecto") 
            }
        }
    }
})

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, "bootcamptalendig")
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredencials = async (email, password) =>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error("Error de Login")
    }

    const isMatch = await bcrypt.compare(password, user.password)
}
userSchema.pre("save", async function(next){
    const user = this
    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password,8) 
        

    }
    
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User