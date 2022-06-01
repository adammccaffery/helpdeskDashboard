import React from "react";

function Card(props) {
    return (
        <div className={"card "+props.customClasses}>
            <h2>{props.name}</h2>
            <div className="valueContainer">
                <p>{props.value}</p>
            </div>
        </div>
    );
}

export default Card;