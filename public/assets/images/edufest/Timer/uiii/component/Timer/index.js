import React, { useEffect, useState } from "react";

// import "./datetime.css";

function App() {
  const calculateTimeLeft = () => {
    let year = new Date().getFullYear();

    const difference = +new Date(`${year}-12-11`) - +new Date();
    // console.log("year", year, difference);
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        d: Math.floor(difference / (1000 * 60 * 60 * 24 )),
        h: Math.floor((difference / (1000 * 60 * 60)) % 24),
        m: Math.floor((difference / 1000 / 60) % 60),
        s: Math.floor((difference / 1000) % 60),
      };
    }



    
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [year] = useState(new Date().getFullYear());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span>
        {timeLeft[interval]}{interval}{":"}
      </span>
    );
  });
  return (
    <div>
      {timerComponents.length ? timerComponents : <span>Time up!</span>}
    </div>
  );
}

export default App;
