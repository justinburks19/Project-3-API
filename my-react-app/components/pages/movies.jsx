import { MovieInfo } from "../../helpers/movieinfo.js";
import { useState } from "react";
import { ThreeDText } from "../../toolbox/Effects/threeDText.jsx";
export function Movies() {
    const [searchTerm, setSearchTerm] = useState(""); // State for the movie title input
    const [change, setChange] = useState(0); // State to trigger re-fetching data
    const [title, year, genre, director, plot, poster, rating, runtime, isLoading, error] = MovieInfo({ searchTerm, change}); // Fetch movie info based on searchTerm and change
    const info = [
        { label: "Poster", value: poster },
        { label: "Title", value: title },
        { label: "Year", value: year },
        { label: "Genre", value: genre },
        { label: "Director", value: director },
        { label: "Plot", value: plot },
        { label: "Rating", value: rating },
        { label: "Runtime", value: runtime },
    ];
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
                {isLoading ? (
                    <div className="text-center mt-4">Loading...</div>
                ) : error ? (
                    <div className="text-center mt-4 text-red-500">Error: {error}</div>
                ) : (
                    <div className="bg-gray-500 rounded-4 mx-auto mt-4 border-blue-500 border-3">
                    {info.some(item => item.value !== "N/A") && (
                        <div className="flex flex-col text-center mt-2">
                            {info.map((item, index) => (
                                <div key={index} className="flex flex-col m-0 !text-[clamp(.8rem,.9vw,1rem)] pb-2">
                                    <span className="font-bold pr-1">{item.label === "Poster" ? "" : item.label + ": "}</span>
                                    <span>{item.value === poster ? <img src={item.value} alt={title} className="w-[clamp(5rem,6vw,7rem)] h-[clamp(5rem,6vw,7rem)] mx-auto border-2 rounded-3" /> : item.value}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                )}
                
            </div>
        </>
    );
}