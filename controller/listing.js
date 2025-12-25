const Listing=require("../models/listing.js");
const geocoding = require('@aashari/nodejs-geocoding');

module.exports.index=async (req,res)=>{
    const allListings=await Listing.find();
    res.render("listings/index.ejs",{allListings});
}
module.exports.renderNewForm=(req,res)=>{
    //isko mai middleware isLogedIn ke ander likh rahe kyu esay ho sbme apply krne ke liye
    // console.log(req.user);
    // console.dir(req.isAuthenticated());
    // if(!req.isAuthenticated()){
    //     req.flash("error","You must login before adding listing!");
    //     return res.redirect("/login");
    // }
    res.render("listings/new.ejs");
}
module.exports.showListing=async (req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!listing){
        req.flash("error","No listing exits");
        return res.redirect("/listing");
    }
    res.render("listings/show.ejs",{listing});
}
module.exports.createListing=async (req,res,next)=>{
        // let result=listingSchema.validate(req.body);
        // // console.log(result);
        // if(result.error){
        //     throw new ExpressError(400,result.error);
        // }
        let url=req.file.path;
        let filename=req.file.filename;
        console.log(url+"..."+filename);
        const listing=req.body.listing;
        const coordinates = await geocoding.encode(listing.location,listing.country);
        // console.log('Coordinates:', coordinates[0].latitude +"..."+ coordinates[0].longitude);
        let latitude=coordinates[0].latitude;
        let longitude=coordinates[0].longitude
        let newlisting=new Listing(listing);
        newlisting.owner=req.user._id;
        newlisting.image={url,filename};
        newlisting.coordinate=[latitude,longitude];
        let data=await newlisting.save();
        console.log(data);
        req.flash("success","new listing is created");
        res.redirect("/listing");
};
module.exports.renderEditForm=async (req,res)=>{
    let {id}=req.params;
    const listing= await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you want to edit is not exits");
        return res.redirect("/listing");
    }
    let originalUrl=listing.image.url.replace("/upload","/upload/w_300");
    res.render("listings/edit.ejs",{listing,originalUrl});
}
module.exports.updateListing=async (req,res)=>{
    if(!req.body.listing){
            throw new ExpressError(400,"Send a valid data");
        }
    let {id}=req.params;

    //#ye check krta owner hi edit kr raha n or iska middleware bana lenge sabmai use krne ke liye
    // let listing=await Listing.findById(id);
    // if(!listing.owner.equals(req.user._id)){
    //     req.flash("error","You are not allow to edit this");
    //     return res.redirect(`/listing/${id}`);
    // };

    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file !=="undefined"){
    let url=req.file.path;
    let filename=req.file.filename;
    listing.image={url,filename};
    await listing.save();
    }
    req.flash("success","Listing is updated");
    res.redirect(`/listing/${id}`); 
}
module.exports.destroyListing=async (req,res)=>{
    let {id}=req.params;
    let deltingListing=await Listing.findByIdAndDelete(id);
    // console.log(deltingListing);
    req.flash("success","One listing is deleted");
    res.redirect("/listing");
}