const express=require('express');
const { codingSolution, multipleSolution, getSolution, getAllSolution } = require('../controllers/solutionController');
const { isAuthenticatedUser } = require("../middleware/auth2");

const solutionRouter=express.Router();

solutionRouter.route("/codingsolution/:id").post(isAuthenticatedUser,codingSolution);
solutionRouter.route("/multiplesolution/:id").post(isAuthenticatedUser,multipleSolution);
solutionRouter.route("/getsolution/:id").get(isAuthenticatedUser,getSolution);
solutionRouter.route("/getAllsolutions/:id").get(getAllSolution);


module.exports=solutionRouter;