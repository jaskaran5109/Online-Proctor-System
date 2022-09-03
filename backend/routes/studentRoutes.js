const express=require('express');
const { getAllStudents, getSingleStudent,registerStudent, loginStudent, logout, deleteStudent, getStudentDetails } = require('../controllers/studentController');
const { isAuthenticatedUser } = require("../middleware/auth2");
const students=express.Router();

students.route("/admin/students").get(getAllStudents);
students.route("/admin/student/:id").get(isAuthenticatedUser,getSingleStudent)
                                    .delete(isAuthenticatedUser,deleteStudent)
students.route('/registerStudent').post(registerStudent)
students.route('/loginStudent').post(loginStudent)
students.route('/logoutStudent').post(logout)
students.route("/student").get(isAuthenticatedUser,getStudentDetails);
module.exports=students;