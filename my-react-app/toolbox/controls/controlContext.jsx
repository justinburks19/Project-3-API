// ControlContext.jsx
import { createContext, useState, useMemo } from "react";
import { GetStates, GetPositions } from "../../helpers/states.js";
// Create the Context
export const ControlContext = createContext(null);

export function ControlProvider({ children }) {
  // Global use states go here!
  // Home Page States
  const [show, setShow]   = useState(false); //show for main content
  const [exit, setExit]   = useState(false); //exit for title
  const [panel, setPanel] = useState(null); 
  const [hover, setHover] = useState(false);//hover state for buttons
  const [pageTracker, setPageTracker] = useState('Home'); //track current page

  //Weather page states go here :) Keep it simple!
    const [label, setLabel] = useState("New York"); // Which way am i going to get the coordinates?
    const [retMethod, setRetMethod] = useState("state"); //set to state by default
    const stateCords = GetPositions(label); // state cords position
    const [stateLat, stateLong] = stateCords; //destructure state cords
    const [getLat, setGetLat] = useState(""); //User Cords
    const [getLong, setGetLong] = useState(""); //User Cords
    const [fireup, setFireup] = useState(false); //for smoke effect trigger

  // Memoize the value object to optimize performance
  const value = useMemo(() => ({ //remember to add new states here, also save the states!
    show, setShow,
    exit, setExit,
    panel, setPanel,
    hover, setHover,
    pageTracker, setPageTracker,
    // Weather Page States
    label, setLabel,
    retMethod, setRetMethod,
    stateLat, stateLong,
    getLat, setGetLat,
    getLong, setGetLong,
    fireup, setFireup,
  }), [show, exit, panel, hover, pageTracker, //Home states
      label, retMethod, stateLat, stateLong, getLat, getLong, fireup //Weather states
  ]); //dependencies array
  //return the provider with the value object
  //value is an object that holds all the global states and their setters
  return (
    <ControlContext.Provider value={value}> 
            {children} {/* render children components which are wrapped in the ControlProvider */}
    </ControlContext.Provider>
  );
}

