const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const Test = require("../models/testModel");

exports.testDetails = catchAsyncError(async (req, res, next) => {
  const { name, organizationName, dateAndTime, testDuration, noOfQuestions } =
    req.body;
  const testIdCheck = await Test.findOne({ user: req.user._id });
  let test;
  if (testIdCheck) {
    test = await Test.findOneAndUpdate({ user: req.user._id }, req.body, {
      new: true,
      runValidators: true,
      useFindAndModift: true,
    });
  } else {
    test = await Test.create({
      name,
      organizationName,
      dateAndTime,
      testDuration,
      noOfQuestions,
      createdAt: Date.now(),
      user: req.user._id,
    });
  }
  res.status(200).json({
    success: true,
    test,
  });
});
exports.testDetail = catchAsyncError(async (req, res, next) => {
  const test = await Test.find();
  res.status(200).json({
    success: true,
    test,
  });
});
