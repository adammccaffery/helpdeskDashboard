import React, { useEffect, useState } from "react";

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
      .then((response) => setWeatherState(response.replace("Edgecliff: ", "").replace("C", "").replace("+","")));
}, []);

  return (
    <div className="weather" style={{}}>
      <p style={{position: 'absolute', bottom: 2, left: 5}}>{weatherState}</p>
    </div>
  );
}

export default Weather;
