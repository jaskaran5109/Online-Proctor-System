const express=require('express');
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { testDetails, testDetail } = require('../controllers/testController');
const test=express.Router();

test.route("/testDetails").post(isAuthenticatedUser,authorizeRoles("admin"),testDetails);
test.route("/testDetail").get(testDetail);
module.exports=test;