import React from "react";
import StudentLogin from "./StudentComponent/Login/StudentLogin";
import StudentWelcome from "./StudentComponent/StudentWelcome";
import Instructions from "./StudentComponent/Instructions/Instructions";
import SolveQuestions from "./StudentComponent/SolveQuestions/SolveQuestions";
import SolveSingleQuestion from "./StudentComponent/SolveQuestions/SolveSingleQuestion";
import StudentRegister from "./StudentComponent/Register/StudentRegister";
import Thankyou from "./StudentComponent/ThankyouPage/Thankyou";
import Webcamp from "./StudentComponent/SolveQuestions/WebCamp/Webcamp";
import Draggable from "react-draggable";
import StudentProtectedRoutes from "./AdminComponent/Routes/StudentProtectedRoutes";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";

const RouterComponent = () => {
  const videoConstraints = {
    width: 220,
    height: 200,
    facingMode: "user",
  };

  const webcamRef = React.useRef(null);
  const imageSrc = "";
  const capture = React.useCallback(() => {
    imageSrc = webcamRef.current.getScreenshot();
  }, [webcamRef]);

 
  return (
    <div>
      {/* <Switch> */}
      <Route exact path="/studentregister" component={StudentRegister} />
      <Route exact path="/studentlogin" component={StudentLogin} />
      <StudentProtectedRoutes
        exact
        path="/studentTest"
        component={StudentWelcome}
      />
      <StudentProtectedRoutes
        strict
        path="/testInstructions"
        component={Instructions}
      />
      <div>
        <StudentProtectedRoutes
          strict
          path="/solveQuestions"
          component={() => (
            <SolveQuestions
              capture={capture}
              imageSrc={imageSrc}
            />
          )}
        />
        <StudentProtectedRoutes
          strict
          path="/solveSingleQuestions/:id"
          component={() => (
            <SolveSingleQuestion
              capture={capture}
              imageSrc={imageSrc}
            />
          )}
        />
        {/* <Draggable bounds={{ top: 0, left: 0, right: 1000, bottom: 0 }}>
              <div className="box">
                <Webcam
                  audio={false}
                  height={200}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={220}
                  videoConstraints={videoConstraints}
                />
              </div>
            </Draggable> */}
      </div>
      <StudentProtectedRoutes exact path="/thankyou" component={Thankyou} />

      {/* </Switch> */}
    </div>
  );
};

export default RouterComponent;
