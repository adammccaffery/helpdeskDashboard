import React from "react";

import Card from "./card";

function CardCategory(props) {
    var openedTickets = props.cards[2].value

  return (
    <div
      className="cardCategoryContainer"
    >
      <h1>{props.title}</h1>
      <div className="cardContainer">
        {props.cards !== null &&
          props.cards.map(function (c, i) {
            return (
              <Card
                key={i}
                name={c.name}
                value={c.value}
                category={c.category}
                openedTickets={openedTickets}
                customClasses={c.customClasses}
              />
            );
          })}
      </div>
    </div>
  );
}

export default CardCategory;
