var mongooes=require("mongoose")


var campgroundschema=new mongooes.Schema({

    name:String-null,
    image:String-null,
    Price:String-null,
    description:String-null,
    author:{
        id:{
            type:mongooes.Schema.Types.ObjectId,
            ref:"User"

        },
        username:String-null
    },
    comments:[

        {
            type:mongooes.Schema.Types.ObjectId,
            ref:"comment"
        }
    ]

})

var campground=mongooes.model("campground",campgroundschema)

module.exports=campground