const  mongoose = require('mongoose')
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please provide a name'],
        minlength: 3,
        maxlength: 30
    },
    email:{
        type: String,
        required: [true, 'Please provide a name'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please valid email',
          ],
        unique:true
    },
    password:{
        type:String,
        required: [true, 'Please provide password'],
        minlength:6,
        // maxlength:14
    }

})
UserSchema.pre('save', async function(next){ 
    const salt = await bycrypt.genSalt(10);
    // console.log(salt);
    this.password = await bycrypt.hash(this.password , salt)


})
UserSchema.methods.createJWT =  function(){
    return (
        jwt.sign({userId: this._id, name: this.name},'randomSecret', {expiresIn: '30d'})
    )
}

module.exports = mongoose.model('User', UserSchema)

