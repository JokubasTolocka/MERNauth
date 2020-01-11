const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true, //whitespace in the beginning will be removed
        required: true,
        max: 32,
        unique: true
    },
    email: {
        type: String,
        trim: true, //whitespace in the beginning will be removed
        required: true,
        lowercase: true,
        unique: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: String,
    role: {
        type: String,
        default: 'subscriber'
    },
    //whenever user asks to reset pass this token will be sent to reset
    resetPasswordLink: {
        data: String,
        default: ''
    }
}, {
    timestamps: true
});

userSchema.virtual('password')
    .set(function(password){
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function(){
        return this._password;
    })

userSchema.methods = {
    encryptPassword: function(password) {
        if(!password) return ''
        try{
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch(err){
            return ''
        }
    },
    makeSalt: function(){
        return Math.round(new Date().valueOf() * Math.random()) + ''
    },
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    }
}

module.exports = mongoose.model('User', userSchema);