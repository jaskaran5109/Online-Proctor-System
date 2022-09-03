import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { clearErrors, register } from "../../actions/userAction";
import "./Register.css";
import {useDispatch, useSelector} from 'react-redux'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Register = () => {
  const history = useHistory()
  const dispatch=useDispatch();
  const { error, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const [user, setuser] = useState({
    name:"",
    email:"",
    password:"",
  })
  const { name, email, password } = user;
  const registerDataChange=(e)=>{
    setuser({...user,[e.target.name]:e.target.value})
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    const myForm = new FormData();
  
      myForm.set("name", name);
      myForm.set("email", email);
      myForm.set("password", password);
      dispatch(register(name,email,password));
  }
  useEffect(() => {
    if (error) {
      alert(error, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      history.push("/");
    }
  }, [dispatch, error, history, isAuthenticated])
  
  return (
    <div className="register">
      <section id="sect">
        <div className="color"></div>
        <div className="color"></div>
        <div className="color"></div>
        <div className="box">
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="container">
            <div className="form">
              <h2>Register</h2>
              <form onSubmit={handleSubmit}>
                <div className="inputBox">
                  <input type="text" placeholder="Name" required name="name" value={name} onChange={registerDataChange}/>
                </div>
                <div className="inputBox">
                  <input type="email" placeholder="Email" required name="email" value={email} onChange={registerDataChange}/>
                </div>
                <div className="inputBox">
                  <input type="password" placeholder="Password" required name="password" value={password} onChange={registerDataChange}/>
                </div>
                <div className="inputBox">
                  <input type="submit" value="Register" />
                </div>
                <p className="forget">
                  Have an account ?{" "}
                  <p>
                    <Link to="/login">Login</Link>
                  </p>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
