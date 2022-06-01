import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

// Components
import TitleHeader from "./components/titleHeader";
import CardCategory from "./components/cardCategory";

function App() {
  const [ticketData, setTicketData] = useState([]);

  useEffect(() => {
    UpdateTicketData();

    // Kick off the loop to update every x milliseconds
    setInterval(UpdateTicketData, 5000);
  }, []);

  const UpdateTicketData = () => {
    console.log("Updating Ticket Data");
    fetch("/ticketStats")
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((jsonResponse) => {
        console.log(jsonResponse);
        setTicketData(jsonResponse);
      });
  };

  const GetCategorisedTickets = () => {
    var categorisedTickets = new Map();

    ticketData.forEach((obj) => {
      if (!categorisedTickets.has(obj.category)) {
        categorisedTickets.set(obj.category, []);
      }

      categorisedTickets.set(
        obj.category,
        categorisedTickets.get(obj.category).concat([
          {
            name: obj.name,
            value: obj.value,
            category: obj.category,
          },
        ])
      );
    });

    return categorisedTickets;
  };

  const RenderCategorisedTickets = () => {
    var cardCategories = [];

    var map = GetCategorisedTickets();

    const mapIterator = map.values();

    for (var i = 0; i < map.size; i++) {
      var category = mapIterator.next();

      cardCategories.push(
        <CardCategory
          title={category.value[0].category}
          cards={category.value}
          totalCategoryNum={map.size}
        />
      );
    }

    return cardCategories;
  };

  return (
    <div className="App">
      {ticketData === null && (
        <div className="loadingScreen">
          <h1>Loading...</h1>
        </div>
      )}
      {ticketData !== null && <div>{RenderCategorisedTickets()}</div>}
    </div>
  );
}

export default App;
