const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const Student = require("../models/studentModel");
const sendToken = require("../utils/jwttoken2");
const bcrypt = require("bcryptjs");

exports.getAllStudents = catchAsyncError(async (req, res, next) => {
  const students = await Student.find();
  if (students.length === 0) {
    return res.status(404).json({
      success: true,
      message: "No Student found",
    });
  }
  res.status(200).json({
    success: true,
    students,
  });
});

exports.registerStudent = catchAsyncError(async (req, res, next) => {
  const { name, collegeId, degree, branch, email, phoneNo, password, gender } = req.body;
  if (password.length < 8) {
    return res.status(404).json({
      success: false,
      message: "Password should be greater than 8 characters",
    });
  }
  const students = await Student.findOne({ email }).select("+password");
  if (students) {
    return res.status(404).json({
      success: false,
      message: `Student with this Email ${email} already exists`,
    });
  }

  const student = await Student.create({
    name, collegeId, degree, branch, email, phoneNo, password, gender
  });

  sendToken(student, 201, res);
});

exports.loginStudent = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please enter your email and password",
    });
  }
  const student = await Student.findOne({ email }).select("+password");
  if (!student) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }
  const isPasswordmatch = await bcrypt.compare(password, student.password);
  if (!isPasswordmatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  sendToken(student, 200, res);
});

exports.getStudentDetails = catchAsyncError(async (req, res, next) => {
  const student = await Student.findById(req.student.id);
  res.status(200).json({
    success: true,
    student,
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

exports.deleteStudent = catchAsyncError(async (req, res, next) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    return next(
      new ErrorHandler(`Student does not exist with id : ${req.params.id}`)
    );
  }
  await student.remove();
  res.status(200).json({
    success: true,
    message: "Student deleted successfully",
  });
});

exports.getSingleStudent=catchAsyncError(async(req,res,next)=>{
  const student=await Student.findById(req.params.id);
  if(!student)
  {
      return next(new ErrorHandler(`Student does not exist with id ${req.body.params}`,))
  }
  res.status(200).json({
      success:true,
      student,
  })
})

