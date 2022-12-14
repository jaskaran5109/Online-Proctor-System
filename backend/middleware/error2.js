const ErrorHandler2=require("../utils/errorhandler2")

module.exports=(err,req,res,next)=>{
    
    err.statusCode=err.statusCode || 500;
    err.message=err.message || "Internal Server Error";

    //wrong mongo id error
    if(err.name==="CastError")
    {
        const message=`Resource not found. Invalid ${err.path}`;
        err=new ErrorHandler2(message,400)
    }
    //Mongoose duplicate key error
    if(err.code===11000)
    {
        const message=`Duplicate ${Object.keys(err.keyValue)} Entered`
        err=new ErrorHandler2(message,400)
    }

    //Wrong JWT token
    if(err.code==='JsonWebToken')
    {
        const message=`Json Web Token is invalid , try again`
        err=new ErrorHandler2(message,400)
    }
    //JWT expoire error
    if(err.code==='TokenExpiredError')
    {
        const message=`Json Web Token is Expired , try again`
        err=new ErrorHandler2(message,400)
    }
    
    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })

}