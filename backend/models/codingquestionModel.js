const mongoose=require("mongoose");

const codingquestionSchema=new mongoose.Schema({
    questionType:{
        type:String,
        requred:true,
        default:"coding"
    },
    heading:{
        type:String,
        required:true,
    },
    level:{
        type:String,
        required:true,
    },
    score:{
        type:Number,
        required:true,
    },
    codeText:{
        type:String,
        required:true,
    },
    input:{
        type:String,
        required:true,
    },
    output:{
        type:String,
        required:true,
    },
    user:{    
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("codingQuestion",codingquestionSchema)