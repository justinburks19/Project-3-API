import { DropDown } from "../../toolbox/dropdownbtns/dropdown.jsx";
import { useState, useEffect } from "react";
import { GetStates, GetPositions} from "../../helpers/states.js";
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
  

  //cordinates edits
  const labelClass = "hover:cursor-pointer w-8/10";
  return (
    <div className="border-t-3">
      {/* subtitle */}
      <div className="mt-6 mb-6 p-4">
      <h2 className="text-center border-b-6 border-t-2 border-r-3 border-l-3
      w-8/10 ml-auto mr-auto 
      pt-7 pb-7 
      bg-green-600">
        Check the weather by selecting a state or select your own coordinates
      </h2>
      </div>
      {/* top selection area */}
      <div className="grid grid-cols-2 gap-l-2 w-full border-b-3 h-full w-full">
        {/*left side dropdown*/}
        <div className="grid-col-span-1 ml-auto mr-auto justify-center">
          <DropDown
            label={label}
            items={GetStates()}
            menueClass="!bg-green-600 !text-black !text-[clamp(1rem,2vw,2rem)] hover:cursor-pointer !shadow-2xl 
            border-b-5 border-l-5 border-t-3 border-r-3
            hover:border-b-3 hover:border-l-3 hover:border-t-2 hover:border-r-2
            border-black"
            buttonClass="!bg-blue-500 !text-black hover:cursor-pointer "
            listItemClass={`!border-b-6 !border-t-4 !border-l-6 !border-r-6 
              !hover:border-b-2 !hover:border-l-2 !hover:border-r-1
              `}
            ulClass="!p-1 !bg-green-600"
            onSelect={(label) => {
              setLabel(label);
              setRetMethod("state");
            }} // Update label on selection
          />
        </div>
        {/*right side map placeholder*/}
        <div className="grid-col-span-1 align-center 
        w-9/10 h-full
        border-l-5 border-b-5 border-l-3 border-r-3 border-t-3 border-black
        bg-green-600
        ml-auto mr-auto p-4
        ">
        
          <p className="text-center bg-green-600 border-l-5 border-b-5 border-r-5 border-t-3">
            Enter Your Location via coordinates
          </p>
          {/* lat/long inputs */}
          <div className="grid grid-cols-2 gap-2 justify-items-center ">
            {/*left side lat input*/}
            <div className="grid-cols-span-1 border-l-6 border-r-3 border-t-4 border-b-7 text-center pb-3">
              <label>Latitude:</label>
              <input
                type="number"
                value={getLat}
                onChange={(e) => setGetLat(e.target.value)}
                className={`${labelClass} border-t-2 border-b-2 
                focus:outline-none focus:border-l-6 focus:border-r-3 focus:border-b-6 focus:border-t-3
                p-1`}
              />
            </div>
            {/*right side long input*/}
            <div className="grid-cols-span-1 
            border-l-3 border-r-6 border-t-4 border-b-7 text-center pb-3 pb-7">
              <label>Longitude:</label>
              <input
                type="number"
                value={getLong}
                onChange={(e) => setGetLong(e.target.value)}
                className={`${labelClass} border-r-2 border-l-2
                focus:outline-none focus:border-r-6 focus:border-l-3 focus:border-b-6 focus:border-t-3
                p-1`} 
                
              />
            </div>
          </div>

          <div className="mt-2 flex justify-center">
            <button
              className="bg-green-600 text-white p-2 border-b-7 border-l-4 border-t-3 border-r-4
            hover:border-b-2 hover:border-l-2 hover:border-t-1 hover:border-r-2
            border-black
            !text-black
            "
              onClick={() => {
                setRetMethod("coords");
              }}
            >
              Get Weather
            </button>
          </div>
        </div>


      {/*Display of Coordinates*/}
      {/* lets practice contorl. I have a original grid that takes up 2 splaces */}
      <div className="mx-10 mt-4 col-span-2 
      border-b-6 border-l-5 border-r-5 border-t-4 bg-green-600 mb-2">
        {/* nested grid for content which splits to 2 columns */}
        <div className="grid grid-cols-2">
          {/* left side shows method used */}
            <div className="col-span-1 align-content-center ">
              {/* I want a 2 row grid inside here, flex flex-col allows for proper spacing*/}
              <div className="flex flex-col text-center border-r-3 pb-1">
                <p className="border-l-4 border-r-4 border-b-4 mb-0 mx-10 font-bold">
                  Selected Method 
                </p>
                <p className="border-l-5 border-r-5 mx-15 border-b-4 border-b-8 mb-0 font">
                  {retMethod === "state" ? "State Coordinates" : "User Coordinates"}
                </p>
              </div>
            </div>
          {/* right side shows coordinates used */}
          <div className="col-span-1 my-auto">
            <div className="grid grid-cols-2 text-center">
              <p className="mt-0 mb-0 col-span-1 mx-2
              border-b-4 border-l-4 border-r-4 border-t-2
              shadow-lg">
                 Latitude: {retMethod === "state" ? lat : getLat}
              </p>
              <p className="mt-0 mb-0 col-span-1 mx-2
              border-b-4 border-l-4 border-r-4 border-t-2
              shadow-lg">
                Longitude: {retMethod === "state" ? long : getLong}
              </p>
            </div>
          </div>
      </div>
      </div>
      </div>

      
      {/*weather info*/}
      {isLoading && <p>Loading weather data...</p>}
      {temp === "N/A" ? <p className="text-red-500">Error: {error}</p> : (
        <>
        <div className="border-2 w-8/12 mt-3 mx-auto 
        font-bold
        text-[clamp(1rem,2vw,1.5rem)]
        font-shadowy">
          
          <p className="text-center"> Location: {name}</p>
          <div className="grid grid-cols-2 gap-4">
          <p>Temperature: {temp}°F</p>
          <p>Condition: {description}</p>
          <p>Pressure: {pressure} hPa</p>
          <p>Humidity: {humidity}%</p>
          <p>Sea Level: {seaLevel} hPa</p>
          <p>Wind Speed: {windSpeed} mph</p>
          <p>Wind Direction: {windDeg}°</p>
          <p>Cloudiness: {cloudiness}%</p>
          </div>
          </div>
        </>
      )}
    </div>
  );
}
