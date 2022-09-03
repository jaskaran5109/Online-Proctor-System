import "./App.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from "./AdminComponent/Navbar/Navbar";
import Home from "./AdminComponent/Home/Home";
import Login from "./AdminComponent/Login/Login";
import Register from "./AdminComponent/Register/Register";
import React, { useCallback, useEffect } from "react";
import { loadUser } from "./actions/userAction";
import store from "./Store";
import CreateTest from "./AdminComponent/Test/CreateTest";
import CodingQuestion from "./AdminComponent/Test/CodingQuestion/CodingQuestion";
import MultipleChoice from "./AdminComponent/Test/MultipleChoiceQuestion/MultipleChoice";
import QuestionNavigator from "./AdminComponent/Test/QuestionNavigator";
import ProtectedRoutes from "./AdminComponent/Routes/ProtectedRoutes";
import AllQuestions from "./AdminComponent/Test/AllQuestions/AllQuestions";
import UpdateQuestion from "./AdminComponent/Test/AllQuestions/UpdateQuestion/UpdateQuestion";
import Dashboard from "./AdminComponent/Dashboard/Dashboard";
import Users from "./AdminComponent/Dashboard/Users/Users";
import UpdateUser from "./AdminComponent/Dashboard/Users/UpdateUser";
import Students from "./AdminComponent/Dashboard/Students/Students";
import AddQuestion from "./AdminComponent/Dashboard/AddQuestion/AddQuestion";
import { loadStudent } from "./actions/studentAction";
import GetStudentSolutions from "./AdminComponent/Dashboard/Students/GetStudentSolutions";
import RouterComponent from "./RouterComponent";
function App() {
  useEffect(() => {
    store.dispatch(loadStudent());
    store.dispatch(loadUser());
  }, []);
  // window.addEventListener("contextmenu",(e)=>e.preventDefault())
  return (
    <div>
      <Router>
        {/* <Switch> */}
          <div>
            <div><Route exact component={RouterComponent} /></div>

            <Route exact path="/">
              <Navbar />
              <Home />
            </Route>
            <Route exact path="/login">
              <Navbar />
              <Login />
            </Route>
            <Route exact path="/register">
              <Navbar />
              <Register />
            </Route>
            <ProtectedRoutes isAdmin={true} exact path="/admin/createTest">
              <Navbar />
              <CreateTest />
            </ProtectedRoutes>
            <ProtectedRoutes
              isAdmin={true}
              exact
              path="/admin/createCodingQuestion"
            >
              <Navbar />
              <CodingQuestion />
            </ProtectedRoutes>
            <ProtectedRoutes
              isAdmin={true}
              exact
              path="/admin/createMultipleChoiceQuestion"
            >
              <Navbar />
              <MultipleChoice />
            </ProtectedRoutes>
            <ProtectedRoutes
              isAdmin={true}
              exact
              path="/admin/questionNavigate"
            >
              <Navbar />
              <QuestionNavigator />
            </ProtectedRoutes>
            <ProtectedRoutes isAdmin={true} exact path="/admin/AllQuestions">
              <Navbar />
              <AllQuestions />
            </ProtectedRoutes>
            <ProtectedRoutes
              isAdmin={true}
              exact
              path="/admin/updateQuestion/:id"
            >
              <Navbar />
              <UpdateQuestion />
            </ProtectedRoutes>
            <ProtectedRoutes isAdmin={true} exact path="/admin/dashboard">
              <Navbar />
              <Dashboard />
            </ProtectedRoutes>
            <ProtectedRoutes isAdmin={true} exact path="/admin/allusers">
              <Navbar />
              <Users />
            </ProtectedRoutes>
            <ProtectedRoutes isAdmin={true} exact path="/admin/updateUser/:id">
              <Navbar />
              <UpdateUser />
            </ProtectedRoutes>
            <ProtectedRoutes isAdmin={true} exact path="/admin/allstudents">
              <Navbar />
              <Students />
            </ProtectedRoutes>
            <ProtectedRoutes isAdmin={true} exact path="/admin/addQuestion">
              <Navbar />
              <AddQuestion />
            </ProtectedRoutes>
            <ProtectedRoutes
              isAdmin={true}
              exact
              path="/admin/getStudentSolutions"
            >
              <Navbar />
              <GetStudentSolutions />
            </ProtectedRoutes>
          </div>
        {/* </Switch> */}
      </Router>
    </div>
  );
}

export default App;
