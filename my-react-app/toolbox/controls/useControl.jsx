
import { useContext } from "react";
import { ControlContext } from "./controlContext";
// Custom hook to access control context
export function useControl() {
  const values = useContext(ControlContext); // get context values
  if (!values) throw new Error("useControl must be used within <ControlProvider>"); // ensure proper usage
  return values;
}