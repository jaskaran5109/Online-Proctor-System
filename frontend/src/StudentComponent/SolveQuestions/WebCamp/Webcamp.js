import React from "react";
import Webcam from "react-webcam";
import "./Webcamp.css";

const Webcamp = () => {
  const videoConstraints = {
    width: 220,
    height: 200,
    facingMode: "user"
  };
  
  const webcamRef = React.useRef(null);
  
    const capture = React.useCallback(
      () => {
        const imageSrc = webcamRef.current.getScreenshot();
      },
  
      [webcamRef]
    );
  return (
    <div className="webcam-container">
      <Webcam
        audio={false}
        height={200}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={220}
        videoConstraints={videoConstraints}
      />
      <button 
      onClick={(e)=>{e.preventDefault();capture()}}>
      Capture</button>
    </div>
  );
};

export default Webcamp;
