import {useEffect } from "react";
import { useApi } from "../Context/ApiContext.jsx";

export function MovieInfo({searchTerm, change}){
    const { info, isloading, error, fetchData } = useApi();
    
    useEffect(() => {
        const name = String(searchTerm).trim(); // Ensure searchTerm is a string and trim whitespace
        !name ? console.log("Waiting for search term...") : null;
        const url = `/.netlify/functions/omdb?t=${name}`; // URL for the Netlify function
        fetchData(url);
    }, [change]); // run once when searchTerm changes


    // Extract movie details from the fetched info
    const title = info?.Title ?? "N/A";
    const year = info?.Year ?? "N/A";
    const genre = info?.Genre ?? "N/A";
    const director = info?.Director ?? "N/A";
    const plot = info?.Plot ?? "N/A";
    const poster = info?.Poster ?? "N/A";
    const rating = info?.imdbRating ?? "N/A";
    const runtime = info?.Runtime ?? "N/A";

    return [title, year, genre, director, plot, poster, rating, runtime, isloading, error];
}