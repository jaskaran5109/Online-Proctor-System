import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../actions/studentAction";
import "./StudentLogin.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentLogin = ({ history }) => {
  const dispatch = useDispatch();

  const { error, isAuthenticated } = useSelector((state) => state.student);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      history.push("/studentTest");
    }
  }, [dispatch, error, history, isAuthenticated]);
  return (
    <div className="logincontainer">
      <div className="title">Login</div>
      <div className="logincontent">
        <form onSubmit={handleLoginSubmit}>
          <div className="login-user-details">
            <div className="login-input-box">
              <span className="details">Email</span>
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="login-input-box">
              <span className="details">Password</span>
              <input
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="button">
            <input type="submit" value="Login" />
          </div>
        </form>
        <div>
          <h5 style={{ marginTop: "10px", lineHeight: "20px" }}>
            Don't Have an account ?
          </h5>
          <h5
            onClick={() => history.push("/studentregister")}
            style={{ color: "darkblue", cursor: "pointer" }}
          >
            Register
          </h5>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
