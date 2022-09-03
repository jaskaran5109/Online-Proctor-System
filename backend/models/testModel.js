const mongoose=require("mongoose");

const test=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    organizationName:{
        type:String,
        required:true,
    },
    dateAndTime:{
        type:String,
        required:true,
    },
    testDuration:{
        type:Number,
        required:true,
    },
    noOfQuestions:{
        type:Number,
        required:true,
    },
    user:{    
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    createdAt:{
        type:Date,
        default: Date.now,
    },
})

module.exports=mongoose.model("test",test)