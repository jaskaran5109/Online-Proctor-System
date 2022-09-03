const express=require('express');
const { registerUsers, loginUser, logout, getAllUsers, getUserDetails, deleteUser, getSingleUser, updateRole} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router=express.Router();

router.route("/admin/users").get(isAuthenticatedUser,authorizeRoles("admin"),getAllUsers);
router.route("/admin/user/:id").get(isAuthenticatedUser,authorizeRoles("admin"),getSingleUser)
                                .put(isAuthenticatedUser,authorizeRoles("admin"),updateRole)
                                .delete(isAuthenticatedUser,authorizeRoles("admin"),deleteUser);
router.route('/register').post(registerUsers)
router.route('/login').post(loginUser)
router.route('/logout').post(logout)
router.route("/me").get(isAuthenticatedUser,getUserDetails);
module.exports=router;