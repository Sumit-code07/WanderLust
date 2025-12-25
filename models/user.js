const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose");

const userSchema= new Schema({
    email:{
        type:String,
        required:true,
    }
})

userSchema.plugin(passportLocalMongoose.default); //ye username khud de bana deta hai or passord ko hash mai convert kr dega salt ke sath

module.exports = mongoose.model('User', userSchema);