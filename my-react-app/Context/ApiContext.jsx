import { createContext, useContext } from "react";
import { ApiProvider } from "./ApiProvider";

export const ApiContext = createContext(undefined);

export const useApi = () => {
  const provider = useContext(ApiContext);
  provider ? console.log("ApiContext provider found") : console.log("ApiContext provider not found");
  return provider; // {info, isLoading, error, fetchData}
};
