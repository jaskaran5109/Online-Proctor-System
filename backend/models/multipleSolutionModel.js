const mongoose=require("mongoose");

const multipleSolution=new mongoose.Schema({
    questionType:{
        type:String,
        requred:true,
        default:"multiple"
    },
    heading:{
        type:String,
        required:true,
    },
    score:{
        type:Number,
        required:true,
        default:0
    },
    option:{
        type:String,
        required:true,
    },
    questionId:{
        type:String,
        required:true,
    },
    studentId:{    
        type:mongoose.Schema.ObjectId,
        ref:'student',
        required:true
    },
    images:[
        {
            url:{
                type:String,
                required:true,
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("multiplesolution",multipleSolution)