import { MovieInfo } from "../../helpers/movieinfo.js";
import { useState } from "react";
import { ThreeDText } from "../../toolbox/Effects/threeDText.jsx";
export function Movies() {
    const [searchTerm, setSearchTerm] = useState(""); // State for the movie title input
    const [change, setChange] = useState(0); // State to trigger re-fetching data
    const [title, year, genre, director, plot, poster, rating, runtime, loading, error] = MovieInfo({ searchTerm, change}); // Fetch movie info based on searchTerm and change
    const info = [
        { label: "Title", value: title },
        { label: "Year", value: year },
        { label: "Genre", value: genre },
        { label: "Director", value: director },
        { label: "Plot", value: plot },
        { label: "Rating", value: rating },
        { label: "Runtime", value: runtime },
        { label: "Poster", value: poster },
    ];
    loading ? <div className="text-center mt-10">Loading...</div> : null;
    error ? <div className="text-center mt-10 text-red-600">Error: {error}</div> : null;
    return (
        <>
        <div className="flex flex-col items-center mt-2">
            <ThreeDText
                title="Movie Search"
                begin="🎬"
                end="🎬"
                startEnd={true}
                threeDAlignment="top-[clamp(0.3rem,.3vw,1rem)] right-[clamp(0.3rem,.4vw,1rem)]"
            />
            </div>
            <div className="flex flex-row mt-4 justify-content-center pl-2">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Enter movie title"
                    className="border border-black rounded p-2 mt-10 bg-gray-200"
                />
                <button
                    onClick={() => setChange(change + 1)}
                    className="bg-blue-500 text-white rounded"
                >
                    Search
                </button>
                
                
            </div>
            <div>
            </div>
            <div className="flex text-black relative w-full justify-content-center">
                    <div>
                        {error ? (<div className="text-red-600 absolute">Error fetching data: {error}</div>) : loading ? (
                            <div className="text-blue-600 absolute text-center"><p>Loading movie data...</p></div>
                        ) : null}
                    </div>
                    <div className="w-25 h-50 bg-gray-500 p-1 rounded-md mt-1 mx-auto">
                    {info.some(item => item.value !== "N/A") && (
                        <div className="flex flex-col mt-4 text-center">
                            {info.map((item, index) => (
                                <div key={index} className="flex flex-col m-0 !text-[clamp(0.5rem,1vw,2rem)]">
                                    <span className="font-bold pr-1">{item.label === "Poster" ? "" : item.label + ": "}</span>
                                    <span>{item.value === poster ? <img src={item.value} alt={title} className="w-40 h-40 mx-auto border-2 rounded-3" /> : item.value}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                
            </div>
        </>
    );
}