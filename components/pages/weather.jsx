import { DropDown } from "../../toolbox/dropdownbtns/dropdown.jsx";
import { useState, useEffect } from "react";
import { GetStates, GetPositions } from "../../helpers/states.js";
import { WeatherInfo } from "../../helpers/weatherInfo.js";

export function Weather() {
  const [label, setLabel] = useState("New York");
  // Which way am i going to get the coordinates?
  const [retMethod, setRetMethod] = useState("state"); //set to state by default
  // state cords
  const stateCords = GetPositions(label);
  const [stateLat, stateLong] = stateCords;

  //User Cords
  const [getLat, setGetLat] = useState("");
  const [getLong, setGetLong] = useState("");

  //choose what to use based on retMethod
  const lat = retMethod === "state" ? stateLat : getLat;

  const long = retMethod === "state" ? stateLong : getLong;

  const [
    temp,
    description,
    pressure,
    humidity,
    seaLevel,
    windSpeed,
    windDeg,
    cloudiness,
    isLoading,
    error,
    name,
  ] = WeatherInfo(lat, long);
  isLoading ? error : null

  //cordinates edits
  const labelClass = "hover:cursor-pointer w-8/10 p-1";
  //
  return (
    <div className="">
      {/* title */}
      <h2 className="flex d-flex justify-center">Weather</h2>
      {/* subtitle */}
      <h2 className="flex d-flex justify-center mb-4 align-center">
        Check the weather by selecting a state or select on map!
      </h2>
      <div className="grid grid-cols-2 gap-2 mb-4 w-full">
        {/*left side dropdown*/}
        <div className="grid-col-span-1 ml-auto mr-auto justify-center ml-auto mr-auto">
          <DropDown
            label={label}
            items={GetStates()}
            menueClass="!bg-blue-500 !text-white !text-[clamp(1rem,2vw,2rem)] hover:cursor-pointer !shadow-2xl border-b-5 border-l-5 border-t-3 border-r-3
            hover:border-b-3 hover:border-l-3 hover:border-t-2 hover:border-r-2"
            buttonClass="!bg-blue-500 !text-white hover:cursor-pointer"
            onSelect={(label) => {
              setLabel(label);
              setRetMethod("state");
            }} // Update label on selection
          />
        </div>
        {/*right side map placeholder*/}
        <div className="mt-4 grid-col-span-1 ml-auto mr-auto p-2 w-full mb-2 border-2 border-black min-h-50">
          <p className="flex d-flex justify-center">
            Enter Your Location via coordinates
          </p>
          <div className="grid grid-cols-2 gap-2 justify-items-center">
            <div className="grid-cols-span-1">
              <label>Latitude:</label>
              <input
                type="number"
                value={getLat}
                onChange={(e) => setGetLat(e.target.value)}
                className={`${labelClass} border-t-2 border-b-2`}
              />
            </div>

            <div className="grid-cols-span-1">
              <label>Longitude:</label>
              <input
                type="number"
                value={getLong}
                onChange={(e) => setGetLong(e.target.value)}
                className={`${labelClass} border-r-2 border-l-2`}
                
              />
            </div>
          </div>

          <div className="mt-2 flex justify-center">
            <button
              className="bg-blue-500 text-white p-2 border-b-5 border-l-3 border-t-2 border-r-3 
            hover:border-b-2 hover:border-l-1 hover:border-t-1 hover:border-r-1 hover:mb-2"
              onClick={() => {
                setRetMethod("coords");
              }}
            >
              Get Weather
            </button>
          </div>
        </div>
      </div>

      {/*lat/lot*/}
      <div className="flex justify-center">
        <p className="flex d-flex justify-center border-2 w-1/2">
          Current: Latitude: {retMethod === "state" ? lat : getLat}, Longitude:{" "}
          {retMethod === "state" ? long : getLong}
        </p>
      </div>

      {/* location name */}
      <div className="border-2 w-8/12">
        <p>Location: {name}</p>
      </div>
      {/*weather info*/}
      {isLoading && <p>Loading weather data...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      <p>Temperature: {temp}°F</p>
      <p>Condition: {description}</p>
      <p>Pressure: {pressure} hPa</p>
      <p>Humidity: {humidity}%</p>
      <p>Sea Level: {seaLevel} hPa</p>
      <p>Wind Speed: {windSpeed} mph</p>
      <p>Wind Direction: {windDeg}°</p>
      <p>Cloudiness: {cloudiness}%</p>
    </div>
  );
}
