const sendToken=(student,statuscode,res)=>{
    const token2=student.getJWTToken();

    //options for cookie
    const options={
        expires:new Date(
            Date.now() + process.env.COOKIE_EXPIRE2*24*60*60*1000
        ),
        httpOnly:true,
    }
    res.status(statuscode).cookie("token2",token2,options).json({
        success:true,
        student,
        token2
    })
}
module.exports=sendToken;