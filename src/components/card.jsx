import React from "react";

function Card(props) {
  const GetDynamicClass = () => {
    var classList = "";

    if (parseInt(props.value) > 30) {
      classList = "warningImportant";
    } else if (parseInt(props.value) > 15) {
      classList = "warningCaution";
    }

    return classList;
  };

  return (
    <div key={props.name + props.value} className={"card " + GetDynamicClass()}>
      <h2>{props.name}</h2>
      <div className="valueContainer">
        <p>{props.value}</p>
      </div>
    </div>
  );
}

export default Card;
