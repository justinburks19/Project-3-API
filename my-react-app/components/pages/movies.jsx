import { MovieInfo } from "../../helpers/movieinfo.js";
export function Movies() {
    const [title, year, genre, director, plot, poster, rating, runtime, loading, error] = MovieInfo({ searchTerm: "Inception" });
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
            <div className="flex flex-col relative overflow-hidden text-black">
                <h1 className="text-4xl font-bold text-center mt-10">Movies Page</h1>
                <p className="text-center mt-4">This is where you can find information about movies.</p>
                <div className="flex flex-col items-center mt-10">
                    {info.map((item, index) => (
                        <div key={index} className="flex justify-between w-full max-w-2xl p-4 border-b">
                            <span className="font-bold">{item.label}:</span>
                            <span>{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}