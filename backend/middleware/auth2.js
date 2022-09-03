const ErrorHandler=require("../utils/errorhandler");
const catchAsyncError=require("./catchAsyncError");
const jwt=require('jsonwebtoken')
const Student=require('../models/studentModel')

exports.isAuthenticatedUser=catchAsyncError( async(req,res,next)=>{
    const {token2}=req.cookies;
    if(!token2)
    {
        return next(new ErrorHandler("Please login to access this resource",401));
    }

    const decodeddata=jwt.verify(token2,process.env.JWT_SECRET2);
    req.student = await Student.findById(decodeddata.id)
    next();
})
