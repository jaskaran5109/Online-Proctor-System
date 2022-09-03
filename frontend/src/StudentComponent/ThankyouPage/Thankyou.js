import React from "react";
import Tick from "./tick.png";
import './Thankyou.css'
import { useEffect } from "react";
const Thankyou = () => {
  
  return (
    <div
      className="thankyou"
    >
      <img style={{ width: "10%", height: "15%" }} src={Tick} />
      <h1 style={{ fontSize: "60px" }}>Thank you!</h1>
      <p style={{ fontSize: "30px" }}>
        Your submission is received and we will contact you soon.
      </p>
      <p style={{ fontSize: "20px" }}>You can close the tab.</p>
    </div>
  );
};

export default Thankyou;
