import { useEffect } from "react";
import { useApi } from "../Context/ApiContext.jsx";

export function MovieInfo({ searchTerm }){
    const { data, error, loading, fetchData } = useApi();
    useEffect(() => {
        searchTerm ? null : console.log("Waiting for search term...");
        const url = `/.netlify/functions/movies?search=${encodeURIComponent(searchTerm)}`;
        fetchData(url);
    }, [searchTerm]);

    const title = data?.Title ?? "N/A";
    const year = data?.Year ?? "N/A";
    const genre = data?.Genre ?? "N/A";
    const director = data?.Director ?? "N/A";
    const plot = data?.Plot ?? "N/A";
    const poster = data?.Poster ?? "N/A";
    const rating = data?.imdbRating ?? "N/A";
    const runtime = data?.Runtime ?? "N/A";

    return [title, year, genre, director, plot, poster, rating, runtime, loading, error];
}