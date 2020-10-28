//==================================
//        Authentication Route
//==================================

var express=require("express"),
    router=express.Router(),
    passport=require("passport"),
        User=require("../model/user")

//routes
//landing page
router.get("/",function(req,res){
    
    res.render("landing")
    
})

//----------------------------------
//              Signup
//----------------------------------

router.get("/register",function(req,res){
    res.render("register")
})

router.post("/register",function(req,res){

    var Newuser=new User({username:req.body.username})

    User.register(Newuser,req.body.password,function(err,user){

        if(err){
            req.flash("error",err.message)
            res.redirect("/register")
        }else{

            passport.authenticate("local")(req,res,function(){
                req.flash("success","Registeration successfull")
                res.redirect("/campground")
            })
        }

    })
})

//----------------------------------
//              Login
//----------------------------------

router.get("/login",function(req,res){

    res.render("login")
})


router.post("/login",passport.authenticate("local",{
    
    successRedirect:"/campground",
    failureRedirect:"/login"
    
}),function(req,res){

    res.send("user is "+req.body.id)



})

//-----------------------------
//          logout route
//-----------------------------

router.get("/logout",function(req,res){

    req.flash("success","You're Logout")
    req.logout()
    res.redirect("/campground")


})
 

module.exports=router