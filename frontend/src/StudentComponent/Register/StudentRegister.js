import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, register } from "../../actions/studentAction";
import "./StudentRegister.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";

const StudentRegister = () => {
  const history = useHistory()
  const dispatch = useDispatch();
  const { error, isAuthenticated } = useSelector((state) => state.student);
  const [name, setName] = useState("");
  const [collegeId, setCollegeId] = useState("");
  const [degree, setDegree] = useState("");
  const [branch, setBranch] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      register(
        name,
        collegeId,
        degree,
        branch,
        email,
        phoneNo,
        password,
        gender
      )
    );
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
    <div className="registercontainer">
      <div className="title">Registration</div>
      <div className="content">
        <form onSubmit={handleSubmit}>
          <div className="user-details">
            <div className="input-box">
              <span className="details">Full Name</span>
              <input
                type="text"
                placeholder="Enter your name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-box">
              <span className="details">College Id</span>
              <input
                type="text"
                placeholder="Enter your id"
                required
                value={collegeId}
                onChange={(e) => setCollegeId(e.target.value)}
              />
            </div>
            <div className="input-box">
              <span className="details">Degree</span>
              <input
                type="text"
                placeholder="Enter your degree"
                required
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
              />
            </div>
            <div className="input-box">
              <span className="details">Branch</span>
              <input
                type="text"
                placeholder="Enter your branch"
                required
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
              />
            </div>
            <div className="input-box">
              <span className="details">Email</span>
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-box">
              <span className="details">Phone Number</span>
              <input
                type="number"
                placeholder="Enter your number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </div>
            <div className="input-box">
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
          <div className="gender-details">
            <input
              type="radio"
              name="gender"
              id="dot-1"
              value="male"
              onChange={(e) => setGender(e.target.value)}
            />
            <input
              type="radio"
              name="gender"
              id="dot-2"
              value="female"
              onChange={(e) => setGender(e.target.value)}
            />
            <input
              type="radio"
              name="gender"
              id="dot-3"
              value="prefer not to say"
              onChange={(e) => setGender(e.target.value)}
            />
            <span className="gender-title">Gender</span>
            <div className="category">
              <label htmlFor="dot-1">
                <span className="dot one"></span>
                <span className="gender">Male</span>
              </label>
              <label htmlFor="dot-2">
                <span className="dot two"></span>
                <span className="gender">Female</span>
              </label>
              <label htmlFor="dot-3">
                <span className="dot three"></span>
                <span className="gender">Prefer not to say</span>
              </label>
            </div>
          </div>
          <div className="button">
            <input type="submit" value="Register" />
          </div>
        </form>
        <div style={{marginTop: '10px',lineHeight: '20px'}}>
          <h5>Have an account ?</h5>
          <h5 onClick={()=>history.push("/studentlogin")} style={{color:"darkblue",cursor: "pointer"}}>Login</h5>
        </div>
      </div>
    </div>
  );
};

export default StudentRegister;
