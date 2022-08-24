import React, { useState, useEffect } from "react";
import errorImg from "./components/errorIcon.png";
import "./App.css";

// Components
import TitleHeader from "./components/titleHeader";
import CardCategory from "./components/cardCategory";
import Card from "./components/card";
import DigitalClock from "./components/digitalClock";
import Weather from "./components/weather";
import Clock from "react-clock";

function App() {
  const [ticketData, setTicketData] = useState([]);
  const [serverErrorStatus, setServerErrorStatus] = useState(false);
  const [settings, setSettings] = useState([]);

  useEffect(() => {
    UpdateTicketData();

    // Kick off the loop to update every x milliseconds
    setInterval(UpdateTicketData, 5000);
  }, []);

  const UpdateTicketData = () => {
    GetSettings();

    fetch("/ticketStats")
      .then((response) => {
        setServerErrorStatus(response === null || response.status !== 200);

        return response.json();
      })
      .then((jsonResponse) => {
        setTicketData(jsonResponse);
      });
  };

  const GetSettings = () => {
    fetch("/settings")
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        setSettings(jsonResponse);
      });
  };

  const GetSettingValue = (settingName) => {
    for (var i = 0; i < settings.length; i++) {
      if (settings[i].name === settingName) {
        return settings[i].value;
      }
    }

    return null;
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
              top5: obj.top5,
          },
        ])
      );
    });

    return categorisedTickets;
  };

  const GetTicketsForCategory = (category) => {
    var map = GetCategorisedTickets();

    if (map.size === 0) {
      return <div>Error</div>;
    }

    return <CardCategory title={category} cards={map.get(category)} />;
  };

  return (
            <div className="App">
                <TitleHeader />
                {ticketData !== null && (
                    <div className="gridContainer">
                        <div className="gridCell" style={{ gridColumn: "span 2" }}>
                            {GetTicketsForCategory("Helpdesk")}
                            {GetTicketsForCategory("Database")}
                            {GetTicketsForCategory("IT Ops")}
                            {GetTicketsForCategory("Agents")}
                        </div>
                        <Weather />
                        <DigitalClock />
                    </div>
                )}
            </div>
          );
}

export default App;
