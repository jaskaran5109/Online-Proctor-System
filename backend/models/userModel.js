const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
        maxLength:[30,"Name should not have more than 30 characters"],
        minLength:[4,"Name should have more than 4 characters"]
    },
    email:{
        type:String,
        required:[true,"Enter your email"],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
        minLength:[8,"Password should be greater than 8 characters"],
        select:false
    },
    role:{
        type:String,
        default:"user"
    },
    createdAt:{
        type:Date,
        default: Date.now,
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
});
//encypt or hash password
userSchema.pre("save",async function(next){
    if(!this.isModified("password"))
    {
        next();
    }
    this.password=await bcrypt.hash(this.password,10)
})

//JWT token
userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}
userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}





module.exports=mongoose.model("user",userSchema)