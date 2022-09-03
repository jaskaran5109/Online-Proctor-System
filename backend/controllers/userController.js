const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwttoken");
const bcrypt = require("bcryptjs");

exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();
  if (users.length === 0) {
    return res.status(404).json({
      success: true,
      message: "No User found",
    });
  }
  res.status(200).json({
    success: true,
    users,
  });
});

exports.registerUsers = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (password.length < 8) {
    return res.status(404).json({
      success: false,
      message: "Password should be greater than 8 characters",
    });
  }
  const users = await User.findOne({ email }).select("+password");
  if (users) {
    return res.status(404).json({
      success: false,
      message: `User with this Email ${email} already exists`,
    });
  }
  console.log(users);

  const user = await User.create({
    name,
    email,
    password,
  });

  sendToken(user, 201, res);
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please enter your email and password",
    });
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }
  const isPasswordmatch = await bcrypt.compare(password, user.password);
  if (!isPasswordmatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  sendToken(user, 200, res);
});

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with id : ${req.params.id}`)
    );
  }
  await user.remove();
  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

exports.getSingleUser=catchAsyncError(async(req,res,next)=>{
  const user=await User.findById(req.params.id);
  if(!user)
  {
      return next(new ErrorHandler(`User does not exist with id ${req.body.params}`,))
  }
  res.status(200).json({
      success:true,
      user,
  })
})

// Update user Role - admin

exports.updateRole=catchAsyncError(async(req,res,next)=>{
  const newUserData={
      name:req.body.name,
      email:req.body.email,
      role:req.body.role
  }

  await User.findByIdAndUpdate(req.params.id,newUserData,{
      new:true,
      runValidators:true,
      userFindAndModify:false,
  })
  res.status(200).json({
      success:true
  })
  
})