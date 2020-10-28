//================================
//          Campground              
//================================

var express=require("express"),
    router=express.Router(),
    Campground=require("../model/campground")


//campground and index route
router.get("/",function(req,res){

    Campground.find({},function(err,allcampground){
        if(err){

            console.log(err)
        }else{

            res.render("campindex",{camp:allcampground})

        }
    })

    
})
//add new camp in db
router.post("/",isLogedIn,function(req,res){
    //get data from form 
    var name=req.body.campname
    var image=req.body.campimage
    var Price=req.body.campPrice
    var description=req.body.description
    var author={
        id:req.user._id,
        username:req.user.username
    }
    var newcamp={name:name,image:image,Price:Price,description:description,author:author}
    //add into camp array
   Campground.create(newcamp,function(err,newlycamp){
       if(err){
        req.flash("error","something went wrong")
        console.log(err)
       }else{

        //redirect to campground
        req.flash("success","Campground Added Successfully")
        res.redirect("/campground")

       }
   })
})
//get new campground form detail 
router.get("/new",isLogedIn,function(req,res){
    
    
    res.render("campnew")
})

//SHOW-show more info about one campgorund
router.get("/:id",function(req,res){
    var curid = req.params.id; curid = curid.replace(/\s/g,'');
        Campground.findById(curid).populate("comments").exec(function(err,foundcampground){
            
            if(err){

                console.log(err)
                

            }else{

                //render show template with that campground
                res.render("campshow",{Campground:foundcampground})
            }
        })
})
//campground edit route
router.get("/:id/edit",usercampgroundOnwership,function(req,res){
    var curid = req.params.id; curid = curid.replace(/\s/g,'');
    Campground.findById(curid,function(err,founds){
        if(err){
            req.flash("error","you're Not Allow To do This")
            console.log(err)
            res.redirect("/campground")
        }
        req.flash("success","Now You Can Edit Your Campground")
        res.render("edit",{campz:founds})
        founds.author.id=req.user._id
        console.log(founds.author.id)
        console.log(req.user._id)
    })
})
//update route
router.put("/:id",function(req,res){
    var curid = req.params.id; curid = curid.replace(/\s/g,'');
    Campground.findByIdAndUpdate( curid,req.body.campground,function(err,foundx){
        console.log(req.body.campground)
        if(err){
            req.flash("error","Something Went Wrong")
            console.log(err)
            res.redirect("/campground")
        }else{
            req.flash("success","Campground Updated Successfully")
            res.redirect("/campground/"+req.params.id)
        }
    })
})
//delete routes
router.delete("/:id",usercampgroundOnwership, function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            req.flash("error","you're Not Allow To do This")
            console.log(err)
        }else{
            req.flash("success","Campground Deleted Successfully")
            res.redirect("/campground")
        }
    })
})
//islogin function is use to provide authunticate user or allow user to comment or not 
function isLogedIn(req,res,next){

    if(req.isAuthenticated()){
        return next()
    }else{
        req.flash("note","Please Login First")
        res.redirect("/login")
    }
}
// user autherization midleware
function usercampgroundOnwership(req,res,next){
    if(req.isAuthenticated()){

        var curid = req.params.id; curid = curid.replace(/\s/g,'');
        
        Campground.findById(curid,function(err,foundcamp){



            if(err){
                req.flash("error","Campground not found")
                res.redirect("back")
            }else{
                if(foundcamp.author.id.equals(req.user._id)){
                    return next()
                }else{
                    req.flash("error","You dont have Permission To Do That")
                    res.redirect("back")
                }
            }
        })

    }
}
module.exports=router