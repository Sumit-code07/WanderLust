const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const {isLogedIn,isOwner,validateSchema}=require("../middleware.js");
const listingController=require("../controller/listing.js");
const multer  = require('multer')//image upload krne ke liye use krte hai ye link ke form mai de deta hai
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage })//multer ke trough cloudinary mai store krwa lete hai

//same type ke route ko ek sath likh skte hai
router.route("/")
.get(wrapAsync(listingController.index))//index Route
.post(upload.single('listing[image]'),validateSchema,wrapAsync(listingController.createListing));//Create route

//new route
router.get("/new",isLogedIn,listingController.renderNewForm);//ye par likh rhe kyuki server /new ko /id na man le

router.route("/:id")
.get(wrapAsync(listingController.showListing))//show route
.put(isOwner,upload.single('listing[image]'),validateSchema,wrapAsync(listingController.updateListing))//Update route
.delete(isLogedIn,isOwner,wrapAsync(listingController.destroyListing))//Delete route

//index Route
// router.get("/",wrapAsync(listingController.index));


//show route
// router.get("/:id",wrapAsync(listingController.showListing));

//Create route
// router.post("/",validateSchema,wrapAsync(listingController.createListing));

//Edit route
router.get("/:id/edit",isLogedIn,isOwner,wrapAsync(listingController.renderEditForm));

//Update route
// router.put("/:id",isOwner,validateSchema,wrapAsync(listingController.updateListing));

//Delete route
// router.delete("/:id",isLogedIn,isOwner,wrapAsync(listingController.destroyListing));

module.exports=router;

