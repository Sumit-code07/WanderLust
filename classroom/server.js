const express=require("express");
const app=express();
const users=require("./routes/user.js");
const posts=require("./routes/post.js");
// const cookieParse=require("cookie-parser");
const session=require("express-session");
const flash=require("connect-flash");
const path=require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

const sessionOption={
    secret:"mysupersecretstring",
    resave:false,
    saveUninitialized:true
}

app.use(session(sessionOption));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.msgSuccess=req.flash("success");
    res.locals.msgError=req.flash("error");
    next();
})

app.get("/register",(req,res)=>{
    let {name="anonymous"}=req.query;
    req.session.name=name;
    // console.dir(req.session.name);
    if(name==="anonymous"){
        req.flash("error","user is not registered");
    }else{
        req.flash("success","user are registered successfully!");
    }
    res.redirect("/hello");
})
app.get("/hello",(req,res)=>{
    // console.log(req.flash('success'));
    res.render("hello.ejs",{name:req.session.name });
})


// app.get("/test",(req,res)=>{
//     res.send("test is sucessfull");
// })
// app.get("/count",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count=1
//     } 
//     res.send(`the session cout is ${req.session.count}`);
// })

// app.use(cookieParse());
// app.use(cookieParse("secretCode")); //ye singed cookie ke liye krte hai 

// app.get("/signedcookie",(req,res)=>{
//     res.cookie("madeIn","India",{signed:true});
//     res.send("Cookie is save");
// })
// app.get("/verify",(req,res)=>{
//     console.dir(req.signedCookies);
// })

// app.get("/",(req,res)=>{
//     console.dir(req.cookies);
//     res.send("Hi! ,I am root page");
// })
// app.get("/getcookie",(req,res)=>{
//     res.cookie("name","sumit");
//     res.cookie("Greet","Hello");
//     res.cookie("madeIn","India");
//     res.send("Hi you are in cookies page");
// })
// app.get("/greet",(req,res)=>{
//     let {name="anonimas"}=req.cookies;
//     res.send(`Hii ${name}`);
// })

//user route
app.use("/user",users);

// posts route
app.use("/post",posts);



app.listen(3000,()=>{
    console.log("Server is listing port 3000");
})