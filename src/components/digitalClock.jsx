import React, { useEffect, useState } from "react";

function DigitalClock() {
  const [clockState, setClockState] = useState();

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setClockState(date.toLocaleTimeString("default", { hour : "numeric", minute: "2-digit"}));
    }, 1000);
  }, []);

  return (
    <div className="digitalClock" style={{position:'relative'}}>
      <p style={{position: 'absolute', bottom: 2, right: 2}}>{new Date().toLocaleString("default", { weekday: "long" })} {clockState}</p>
    </div>
  );
}

export default DigitalClock;
