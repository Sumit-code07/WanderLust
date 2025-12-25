const express=require("express");
const router= express.Router();

router.get("/",(req,res)=>{
    res.send("Post index page");
})
router.get("/:id",(req,res)=>{
    res.send("post id page");
})
router.post("/",(req,res)=>{
    res.send("posts Post page");
})
router.delete("/:id",(req,res)=>{
    res.send("post delete page");
})

module.exports=router;