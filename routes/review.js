const express=require("express");
const router=express.Router({mergeParams:true});// id params app.js mai hi rah jata , usko lane ke liye mergeParams likhte hai
const wrapAsync=require("../utils/wrapAsync.js");
const {validatReview, isLogedIn,isReviewAuthor}=require("../middleware.js");
const reviewController=require("../controller/review.js")

//#Review route
router.post("/",isLogedIn,validatReview, wrapAsync(reviewController.createReview));

// # Delete review Route
router.delete("/:reviewId",isLogedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview));

module.exports=router;