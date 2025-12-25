const express=require("express");
const router= express.Router();

router.get("/",(req,res)=>{
    res.send("User index page");
})
router.get("/:id",(req,res)=>{
    res.send("User id page");
})
router.post("/",(req,res)=>{
    res.send("User Post page");
})
router.delete("/:id",(req,res)=>{
    res.send("user delete page");
})

module.exports=router;