const { models } = require("mongoose");
const Listing=require("./models/listing.js");
const {listingSchema,reviewSchema}=require("./schema.js");
const ExpressError=require("./utils/ExpressError.js");
const Review=require("./models/review.js");

module.exports.isLogedIn=(req,res,next)=>{
    // console.log(req.path+"...."+ req.originalUrl);//ye kaha ka rahe thai login se pahle uska recort rahta hai
    // console.log(req.user);//agar login in hoga toh user ka value object form mai store krta
    req.session.redirectUrl=req.originalUrl;
    if(!req.isAuthenticated()){
        req.flash("error","You must login before adding listing!");
        return res.redirect("/login");
    }
    next();
}

//Joi ko ek function bana ke add krnegai
module.exports.validateSchema=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner=async (req,res,next)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing.owner.equals(req.user._id)){
        req.flash("error","You are not the owner");
        return res.redirect(`/listing/${id}`);
    };
    next();
}

module.exports.validatReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

module.exports.isReviewAuthor=async(req,res,next)=>{
    let {id,reviewId}=req.params;
    let review=await Review.findById(reviewId);
    if(!review.author.equals(req.user._id)){
        req.flash("error","You are not the owner of this review");
        return res.redirect(`/listing/${id}`);
    };
    next();
}