import React, { useState} from "react";
import { ApiContext } from "./ApiContext.jsx";


export function ApiProvider({children}) {
    const [info, setInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // Function to fetch data from an API 
    //incorporates loading and error handling
    const fetchData = async (url) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(url);
            response ?  response.json().then(setInfo) : setError("Failed to fetch");
            const result = await response.json();
            setInfo(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }   
    };
    const value = {info, isLoading, error, fetchData};
    return (
        <ApiContext.Provider value={value}>
            {children}
        </ApiContext.Provider>
    );
}

// Usage:
// Wrap your application with ApiProvider in the root component
// import { ApiProvider } from './Context/ApiProvider.jsx';
// <ApiProvider>
//   <App />
// </ApiProvider>
