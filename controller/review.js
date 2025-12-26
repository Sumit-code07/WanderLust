const Listing=require("../models/listing.js");
const Review=require("../models/review.js");

module.exports.createReview=async (req,res)=>{
    let listing= await Listing.findById(req.params.id);
    let newreview=new Review(req.body.review);
    newreview.author=req.user._id;
    // console.log(newreview);
    listing.reviews.push(newreview);
    await newreview.save();
    await listing.save();
    req.flash("success","new review is created");
    res.redirect(`/listing/${listing._id}`);
}
module.exports.destroyReview=async(req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","review is delete");
    res.redirect(`/listing/${id}`);
}