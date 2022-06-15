import React, { useEffect, useState } from "react";

function DigitalClock() {
  const [clockState, setClockState] = useState();

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setClockState(date.toLocaleTimeString("en-AU", { hour : "numeric", minute: "2-digit"}));
    }, 1000);
  }, []);

  return (
    <div className="digitalClock" style={{}}>
      <p style={{position: 'absolute', bottom: 2, right: 5}}>{new Date().toLocaleString("default", { day: "numeric", month: "long", weekday: "long" })} {clockState}</p>
    </div>
  );
}

export default DigitalClock;
