import axios from "axios";
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
const MyStopwatch = () => {
  const [testDetails, settestDetails] = useState([]);
  // console.log(location.state.quesid)
  const response2 = async () => {
    const { data } = await axios.get("/api/v1/testDetail");
    data.test.map((item) => {
      settestDetails(item);
    });
  };
 
  let timer=testDetails.testDuration
  const [data, setData] = useState(
    { date: Date.now(), delay: 60*1000*60 } //60 seconds
  );
  const wantedDelay = 60000;
  const Completionist = () => <span>You are good to go!</span>;

// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a complete state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <span>
        {hours}:{minutes}:{seconds}
      </span>
    );
  }
};
  const getLocalStorageValue = (s) => localStorage.getItem(s);
  useEffect(() => {
    const savedDate = getLocalStorageValue("end_date");
    if (savedDate != null && !isNaN(savedDate)) {
      const currentTime = Date.now();
      const delta = parseInt(savedDate, 10) - currentTime;

      //Do you reach the end?
      if (delta > wantedDelay) {
        //Yes we clear uour saved end date
        if (localStorage.getItem("end_date").length > 0)
          localStorage.removeItem("end_date");
      } else {
        //No update the end date  
        setData({ date: currentTime, delay: delta });
      }
    }
    response2()
    console.log(data)
  }, []);
  return (
    <div>
       <Countdown
       key={data.date}
        date={data.date + data.delay}
        renderer={renderer}
        onStart={(delta) => {
          //Save the end date
          if (localStorage.getItem("end_date") == null)
            localStorage.setItem(
              "end_date",
              JSON.stringify(data.date + data.delay)
            );
        }}
        onComplete={() => {
          if (localStorage.getItem("end_date") != null)
            localStorage.removeItem("end_date");
        }}
      />
    </div>
  );
};

export default MyStopwatch;
