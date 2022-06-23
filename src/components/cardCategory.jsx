import React from "react";

import Card from "./card";
import LeaderboardCard from "./leaderboardCard";

function CardCategory(props) {
    if (props.cards[0].category !== "Agents"){
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
    else{
      return (
        <div className="cardCategoryContainer" >
          <div className="cardContainer">
            {props.cards !== null && props.cards.map(function (c, i) {
                return (
                  <LeaderboardCard
                    key={i}
                    name={c.name}
                    top5={c.top5}
                    category={c.category}
                    customClasses={c.customClasses}
                  />
                );
            })}
          </div>
        </div>
      );
    }


}

export default CardCategory;
