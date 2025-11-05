// ControlContext.jsx
import { createContext, useState, useMemo } from "react";

// Create the Context
export const ControlContext = createContext(null);

export function ControlProvider({ children }) {
  // Global use states go here!
  const [show, setShow]   = useState(false); //show for main content
  const [exit, setExit]   = useState(false); //exit for title
  const [panel, setPanel] = useState(null); 
  const [hover, setHover] = useState(false);//hover state for buttons
  const [pageTracker, setPageTracker] = useState('Home'); //track current page

  const value = useMemo(() => ({ //remember to add new states here, also save the states!
    show, setShow,
    exit, setExit,
    panel, setPanel,
    hover, setHover,
    pageTracker, setPageTracker,
  }), [show, exit, panel, hover, pageTracker]); //dependencies array
  //return the provider with the value object
  //value is an object that holds all the global states and their setters
  return (
    <ControlContext.Provider value={value}> 
            {children} {/* render children components which are wrapped in the ControlProvider */}
    </ControlContext.Provider>
  );
}

