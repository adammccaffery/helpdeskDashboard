import React, { useEffect, useState } from "react";
import emoji from "react-easy-emoji";

function Weather() {
  const [weatherState, setWeatherState] = useState();

  useEffect(() => {
    /* 
    setInterval(() => {
      setWeatherState(fetch('http://wttr.in/Sydney?format=3').then((response) => {
                                return response.text();
                            }
                        ));
    }, 1000);
  },
      */
    fetch('https://wttr.in/Edgecliff?format=3')
      .then((response) => response.text())
      .then((response) => {
        if (!response.includes("running out of queries")) {
            setWeatherState(emoji(response.replace("Edgecliff: ", "").replace("C", "").replace("+","")))
        } else {
            setWeatherState("")
        }
      });
}, []);

  return (
    <div className="weather" style={{}}>
      <p style={{position: 'absolute', bottom: 2, left: 5}}>{weatherState}</p>
    </div>
  );
}

export default Weather;
