import React, { useState, useEffect } from "react";
import errorImg from "./components/errorIcon.png";
import "./App.css";

// Components
import TitleHeader from "./components/titleHeader";
import CardCategory from "./components/cardCategory";
import Clock from "./components/clock";

function App() {
  const [ticketData, setTicketData] = useState([]);
  const [serverErrorStatus, setServerErrorStatus] = useState(false);

  useEffect(() => {
    UpdateTicketData();

    // Kick off the loop to update every x milliseconds
    setInterval(UpdateTicketData, 5000);
  }, []);

  const UpdateTicketData = () => {
    fetch("/ticketStats")
      .then((response) => {
        setServerErrorStatus(response === null || response.status !== 200);

        return response.json();
      })
      .then((jsonResponse) => {
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

  const GetTicketsForCategory = (category) => {
    var map = GetCategorisedTickets();

    if (map.size === 0) {
      return <div>Error</div>
    }

    return <CardCategory title={category} cards={map.get(category)} />;
  }

  return (
    <div className="App">
      {ticketData !== null && (
        <div className="gridContainer">
        <div className="gridCell">
          {/* This is for the IT Ops tickets */}
          {GetTicketsForCategory("IT Ops")}
        </div>
        <div className="gridCell">
          {/* This is for the digital date/clock */}
          <Clock />
        </div>
        <div className="gridCell" style={{gridColumn: "span 2"}}>
          {/* This is for the more important ticket data, Helpdesk and Database */}
          {GetTicketsForCategory("Helpdesk")}
          {GetTicketsForCategory("Database")}
        </div>
        <div
          className="serverErrorIcon"
          style={serverErrorStatus ? { opacity: 1 } : { opacity: 0 }}
        >
          <img src={errorImg} />
        </div>
      </div>
      )}
      
    </div>
  );
}

export default App;
