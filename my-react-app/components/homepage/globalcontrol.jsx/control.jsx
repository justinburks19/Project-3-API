// ControlContext.jsx
import { createContext, useContext, useState, useMemo } from "react";

const ControlCtx = createContext(null);

export function ControlProvider({ children }) {
  // put any global flags here
  const [show, setShow]   = useState(false);
  const [exit, setExit]   = useState(false);
  const [panel, setPanel] = useState(null); // e.g., which panel to show

  const value = useMemo(() => ({
    show, setShow,
    exit, setExit,
    panel, setPanel,
  }), [show, exit, panel]);

  return <ControlCtx.Provider value={value}>{children}</ControlCtx.Provider>;
}

export function useControl() {
  const ctx = useContext(ControlCtx);
  if (!ctx) throw new Error("useControl must be used within <ControlProvider>");
  return ctx;
}
