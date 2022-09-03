const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const Coding = require("../models/codingquestionModel");
const Multiple = require("../models/multiplequestionModel");

//create Coding Question
exports.codingquestions = catchAsyncError(async (req, res, next) => {
  const { questionType, heading, level, score, codeText, input, output } =
    req.body;
  if (!codeText) {
    return res.status(404).send({
      success: false,
      message: "Please Write your question",
    });
  }
  const question = await Coding.create({
    questionType,
    heading,
    level,
    score,
    codeText,
    input,
    output,
    createdAt: Date.now(),
    user: req.user._id,
  });
  res.status(200).json({
    success: true,
    question,
  });
});

//create Coding Question
exports.multiplequestions = catchAsyncError(async (req, res, next) => {
  const {
    questionType,
    heading,
    score,
    questionText,
    option1,
    option2,
    option3,
    option4,
    output,
  } = req.body;

  const question = await Multiple.create({
    questionType,
    heading,
    score,
    questionText,
    option1,
    option2,
    option3,
    option4,
    output,
    createdAt: Date.now(),
    user: req.user._id,
  });
  res.status(200).json({
    success: true,
    question,
  });
});

//get all Question
exports.getquestions = catchAsyncError(async (req, res, next) => {
  const questions = await Coding.find();
  const multiple = await Multiple.find();
  res.status(200).json({
    success: true,
    questions,
    multiple,
  });
});

exports.deletequestion = catchAsyncError(async (req, res, next) => {
  let codquestion = await Coding.findById(req.params.id);
  let mulquestion = await Multiple.findById(req.params.id);
  if (codquestion) {
    await codquestion.remove();
  }
  if (mulquestion) {
    await mulquestion.remove();
  }
  res.status(200).json({
    success: true,
    message: "Deleted Succesfully",
  });
});

exports.updatequestion = catchAsyncError(async (req, res, next) => {
  let codquestion = await Coding.findById(req.params.id);
  let mulquestion = await Multiple.findById(req.params.id);

  if (codquestion) {
    codquestion = await Coding.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModift: true,
    });
  }

  if (mulquestion) {
    mulquestion = await Multiple.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModift: true,
    });
  }
  res.status(200).json({
    success: true,
    message:"Updated Successfully",
  });
});

exports.getquestion = catchAsyncError(async (req, res, next) => {
  const questions = await Coding.findById(req.params.id);
  const multiple = await Multiple.findById(req.params.id);
  if(questions)
  {
    res.status(200).json({
      success: true,
      questions,
    });
  }
  if(multiple)
  {
    res.status(200).json({
      success: true,
      multiple,
    });
  }
});