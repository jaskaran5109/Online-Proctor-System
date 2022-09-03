import React from "react";

const MultipleCard = ({ item }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        border: "1px solid lightgray",
        borderRadius: "10px",
        padding: "10px",
        marginTop:'10px'
      }}
    >
      <h3>{item.heading}</h3>
      <p>{item.option}</p>
      <p>{item.score}</p>
    </div>
  );
};

export default MultipleCard;
