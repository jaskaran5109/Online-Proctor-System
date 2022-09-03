const express=require('express');
const { codingquestions, multiplequestions, getquestions, deletequestion, updatequestion, getquestion } = require('../controllers/questionController');
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const questionRouter=express.Router();

questionRouter.route("/admin/codingquestions").post(isAuthenticatedUser,authorizeRoles("admin"),codingquestions);
questionRouter.route("/admin/multiplequestions").post(isAuthenticatedUser,authorizeRoles("admin"),multiplequestions);
questionRouter.route("/admin/getAllQuestions").get(getquestions);
questionRouter.route("/admin/deleteQuestions/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deletequestion);
questionRouter.route("/admin/updateQuestions/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updatequestion);
questionRouter.route("/admin/getQuestion/:id").get(getquestion);

module.exports=questionRouter;