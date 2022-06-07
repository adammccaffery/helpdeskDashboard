import React, { useEffect, useState } from "react";

function DigitalClock() {
  const [clockState, setClockState] = useState();

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setClockState(date.toLocaleTimeString());
    }, 1000);
  }, []);

  return (
    <div className="digitalClock">
      <p>{new Date().toLocaleString("default", { weekday: "long" })}</p>
      <p>{clockState}</p>
    </div>
  );
}

export default DigitalClock;
