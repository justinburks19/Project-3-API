// ControlContext.jsx
import { createContext, useState, useMemo } from "react";

// Create the Context
export const ControlContext = createContext(null);

export function ControlProvider({ children }) {
  // Global use states go here!
  const [show, setShow]   = useState(false);
  const [exit, setExit]   = useState(false);
  const [panel, setPanel] = useState(null); 

  const value = useMemo(() => ({ //remember to add new states here, also save the states!
    show, setShow,
    exit, setExit,
    panel, setPanel,
  }), [show, exit, panel]); //dependencies array
  //return the provider with the value object
  //value is an object that holds all the global states and their setters
  return (
    <ControlContext.Provider value={value}> 
            {children} {/* render children components which are wrapped in the ControlProvider */}
    </ControlContext.Provider>
  );
}

