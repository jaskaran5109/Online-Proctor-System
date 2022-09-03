import React from "react";
import "./Home.css";
import {Link} from 'react-router-dom' 
import {useSelector} from 'react-redux'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const { isAuthenticated } = useSelector(
    (state) => state.user
  );
  const handleClick=()=>{
    if(!isAuthenticated){
      alert("Please Login to access this resource", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  return (
    <div id="show-page">
      <div className="container">
        <div className="container-text">
          <h1>Conveniently test where you want when you want</h1>
          <h4>Easily create, manage and monitor tests & result</h4>
          <Link to={isAuthenticated && "/admin/createTest"}><button onClick={handleClick}>Create Test</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
