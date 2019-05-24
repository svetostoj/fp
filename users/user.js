const mongoose = require('../db/connectdb')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

// Define our model
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String
});

// On save Hook, encrypt password
userSchema.pre('save', function (next) {
    const user = this;

    bcrypt.genSalt(10, function (err, sult) {
        if (err) { return next(err) };
       
        bcrypt.hash(user.password, sult, null, function (err, hash) {
            if (err) { return next(err) };

            user.password = hash;
            next();
        });
    });
});

// compare password ...used on signin
userSchema.methods.comparePassword=function(candidatePassword, callback){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if (err) { return callback(err);}
        callback(null, isMatch);
    })
}
// Create the class ... user bellow is the name of the table in db
const ModelClass = mongoose.model('user', userSchema);

// export the model
module.exports = ModelClass;