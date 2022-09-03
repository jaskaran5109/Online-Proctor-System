const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const CodingSolution = require("../models/codeSolutionModel");
const MultipleSolution = require("../models/multipleSolutionModel");

exports.codingSolution = catchAsyncError(async (req, res, next) => {
  const { questionType, heading, score, codeText,language, questionId } = req.body;
  const questionIdCheck = await CodingSolution.findOne({ questionId });
  let solution;
  if (questionIdCheck) {
    solution = await CodingSolution.findOneAndUpdate({ questionId }, req.body, {
      new: true,
      runValidators: true,
      useFindAndModift: true,
    });
  } else {
    solution = await CodingSolution.create({
      questionType,
      heading,
      score,
      codeText,
      language,
      questionId,
      studentId: req.student._id,
      createdAt: Date.now(),
    });
  }

  res.status(200).json({
    success: true,
    solution,
  });
});

exports.multipleSolution = catchAsyncError(async (req, res, next) => {
  const { questionType, heading, score, option, questionId,url } = req.body;
  const image = {
    url,
  };
  const questionIdCheck = await MultipleSolution.findOne({ questionId });
  let solution;
  if (questionIdCheck) {
    solution = await MultipleSolution.findOneAndUpdate(
      { questionId },
      req.body,
      {
        new: true,
        runValidators: true,
        useFindAndModift: true,
      }
    );
  } else {
    solution = await MultipleSolution.create({
      questionType,
      heading,
      score,
      option,
      images,
      questionId,
      studentId: req.student._id,
      createdAt: Date.now(),
    });
  }

  res.status(200).json({
    success: true,
    solution,
  });
});

exports.getSolution = catchAsyncError(async (req, res, next) => {
  const coding = await CodingSolution.findOne({ questionId: req.params.id });
  const multiple = await MultipleSolution.findOne({
    questionId: req.params.id,
  });
  if (coding) {
    res.status(200).json({
      success: true,
      coding,
    });
  }
  if (multiple) {
    res.status(200).json({
      success: true,
      multiple,
    });
  }
});

exports.getAllSolution = catchAsyncError(async (req, res, next) => {
  const coding = await CodingSolution.find({ studentId: req.params.id });
  const multiple = await MultipleSolution.find({ studentId: req.params.id });
  res.status(200).json({
    success: true,
    coding,
    multiple,
  });
});
