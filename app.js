//learn more about js
//lean more about node js and express

//require server setup
var express=require("express")
var app=express()
var mongooes=require("mongoose")
var passport=require("passport")
var bodyparse=require("body-parser")
var User=require("./model/user")
var LocalStrategy=require("passport-local")
var passportLocalMongoose=require("passport-local-mongoose")
var campground=require("./model/campground")
var seedDB=require("./seed")
var Comment=require("./model/comment")
var commentRoutes=require("./routes/comment")
var campgroundRoutes=require("./routes/campground")
var indexRoutes=require("./routes/index")
var MethodOverride=require("method-override")
var flash          =require("connect-flash")

//required mangooes
mongooes.connect("mongodb://localhost:27017/yelpcamp_app_v5",{useNewUrlParser:true,useUnifiedTopology: true, useFindAndModify: false })
//use body parse middlerware
app.use(bodyparse.urlencoded({extended:true}))
app.use(express.static(__dirname+ "/public"))

app.use(flash())
//authentication congfig
app.use(require("express-session")({
    secret:"Rusty is the best og in the world",
    resave:false,
    saveUninitialized:false
}))

//setting ejs remain ejs no need to define type in every routes
app.set("view engine","ejs")
app.use(passport.initialize())
app.use(passport.session())
app.use(MethodOverride("_method"))

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// call seed function
// seedDB()://seed the database


//variable can be use globally 
app.use(function(req, res, next ){
    res.locals.Currentuser=req.user
    res.locals.error=req.flash("error")
    res.locals.note=req.flash("note")
    res.locals.success=req.flash("success")
    next()
})

app.use("/",indexRoutes)
app.use("/campground/:id/comments",commentRoutes)
app.use("/campground",campgroundRoutes)

app.listen(8000,function(){

    console.log("The Yelpcamp Server Has been Started!")
})