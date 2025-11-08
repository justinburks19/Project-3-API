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
        await new Promise((e) => setTimeout(e, 100)); // Simulate loading delay of 1 second
        try {
            
            const response = await fetch(url); // Fetch data from the provided URL
            if (!response.ok) throw new Error(`Failed to fetch data ${response.status}`); // Handle HTTP errors
            const result = await response.json(); // Parse the JSON response
            setInfo(result); // Update state with fetched data
        } catch (err) { // Catch and set any errors that occur during fetch
            setError(err.message || "Something went wrong"); // Set error message
        } finally { // Always executed after try/catch
            setIsLoading(false); // Set loading to false
        }   
        
    };

    const value = {info, isLoading, error, fetchData}; // Context value to be provided to consumers
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
