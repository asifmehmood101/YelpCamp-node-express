var mongooes=require("mongoose")

var commentschema=new mongooes.Schema({

    text:String-null,
    author:{
        id:{
            type:mongooes.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String-null
    }
})

var comment=mongooes.model("comment",commentschema)

module.exports=comment


