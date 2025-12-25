const User=require("../models/user.js");
const passport=require("passport");

module.exports.renderSignupForm=(req,res)=>{
    res.render("user/signup.ejs");
}
module.exports.signup=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newUser= new User({username,email});
        let userRegister=await User.register(newUser,password);
        console.log(userRegister);
        req.login(userRegister,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to WanderLust");
            res.redirect("/listing");
        })
        
    }catch(e){
        req.flash("error","User is already exits");
        res.redirect("/signup");
    }
}
module.exports.renderLoginForm=(req,res)=>{
    res.render("user/login.ejs");
}
module.exports.login=async (req,res)=>{
    req.flash("success","Welcome back to WanderLust");
    let redirectUrl=res.locals.redirectUrl ||"/listing"
    res.redirect(redirectUrl);
}
module.exports.logout=(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err)
        }
        req.flash("success","You are logOut");
        res.redirect("/listing");
    });
    
}