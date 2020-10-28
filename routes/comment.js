//======================================
//          Comments Routes
//======================================

var express=require("express"),
    router=express.Router({mergeParams:true}),
    campground=require("../model/campground"),
    Comment=require("../model/comment")
// open form for adding new comments
router.get("/new",isLogedIn,function(req,res){

    //find by id
    var curid = req.params.id; curid = curid.replace(/\s/g,'');
    campground.findById(curid,function(err,campgroundz){

        if(err){

            console.log(err)
        }else{
            res.render("commnew",{camps:campgroundz})
        }
    })
})

//add new comments in post
router.post("/",isLogedIn,function(req,res){
    //find by id
    var curid= req.params.id; curid = curid.replace(/\s/g,'');
    campground.findById(curid,function(err,Campgroundx){
        if(err){

            console.log(err)
            res.redirect("/campground")
        }else{

            Comment.create(req.body.comment,function(err,comment){

                if(err){

                    console.log(err)
                }else{
                    
                    //add username and id in comment
                    comment.author.id=req.user._id
                    comment.author.username=req.user.username
                    comment.save()

                    Campgroundx.comments.push(comment)

                    Campgroundx.save()
                    req.flash("success","Comment Added Successfully")
                    res.redirect("/campground/"+Campgroundx._id)


                }
            })

        }
    })

})
//edit comment
router.get("/:comment_id/edit",userCommentownership,function(req,res){
    var curid= req.params.comment_id; curid = curid.replace(/\s/g,'');
    Comment.findById(curid,function(err,foundcamp){
        if(err){
            req.flash("error","You're Not Allow To Do That")
            console.log(err)
            res.redirect("back")
        }else{
            req.flash("success","Now You Can Edit Your Campground")
            res.render("commedit",{campid:req.params.id,comm:foundcamp})
        }
    })
})
//update comments
router.put("/:comment_id",function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatecomms){
        if(err){
            req.flash("error","You're Not Allow To Do That")
            console.log(err)
        }else{
            req.flash("success","Comment Updated Successfully")
            res.redirect("/campground/"+req.params.id)
        }
    })
})
//delete comement
router.delete("/:comment_id",userCommentownership,function(req,res){
    Comment.findByIdAndDelete(req.params.comment_id,function(err){
        if(err){
            req.flash("error","You're Not Allow To Do That")
            console.log(err)
        }else{
            req.flash("success","Comment Deleted Successfully")
            res.redirect("/campground/"+req.params.id)
        }
    })
})
//islogin function is use to provide authunticate user or allow user to comment or not 
function isLogedIn(req,res,next){

    if(req.isAuthenticated()){
        return next()
    }else{
        req.flash("error","Please Login First")
        res.redirect("/login")
    }
}

//autherization middllware 
function userCommentownership(req,res,next){
    if(req.isAuthenticated()){
        var curid = req.params.comment_id; curid = curid.replace(/\s/g,'');
        Comment.findById(curid,function(err,foundcomments){
            if(err){
                res.redirect("back")
                console.log(err)
            }else{
                if(foundcomments.author.id.equals(req.user._id)){
                    return next()
                }else{

                    res.redirect("back")
                }
            }   
        })
    }
}
module.exports=router