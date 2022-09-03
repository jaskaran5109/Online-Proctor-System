const mongoose=require("mongoose");

const codeSolution=new mongoose.Schema({
    questionType:{
        type:String,
        requred:true,
        default:"coding"
    },
    heading:{
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
    language:{
        type:String,
        required:true,
        default:"javascript"
    },
    questionId:{
        type:String,
        required:true,
        unique:true,
    },
    studentId:{    
        type:mongoose.Schema.ObjectId,
        ref:'student',
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("codesolution",codeSolution)