// src/hooks/useTimeTheme.js
import { useEffect, useState } from "react";

// Function to determine current theme based on time of day
// Returns background style and border class
// Light theme from 6 AM to 6 PM, dark theme otherwise
// Updates theme every intervalMs milliseconds (default 60,000 ms = 1 minute)

const getTheme = () => {
  const hour = new Date().getHours(); //retrieve current hour
  const isLight = hour >= 6 && hour < 18; //light theme between 6 AM and 6 PM
    // Return theme object
  return isLight ? {
      bg: { background: "linear-gradient(200deg, #2c2c2cff, #000000ff)" },
    } 
    :{ //return dark theme if not between 6 AM and 6 PM
      bg: { background: "linear-gradient(200deg, #2c2c2cff, #000000ff)" },
    };
};
// Custom hook to use time-based theme
// Returns current theme and updates it at specified intervals which is every 
export function UseTimeTheme(intervalMs = 60000) {
  const [theme, setTheme] = useState(() => getTheme());  // 

  useEffect(() => {
    // update now and then on an interval which is a minute by default
    const id = setInterval(() => setTheme(getTheme()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return theme; // { bg, textClass, borderClass }
}
