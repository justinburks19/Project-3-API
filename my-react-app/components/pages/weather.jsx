import { DropDown } from "../../toolbox/dropdownbtns/dropdown.jsx";
import { useState, useEffect, useRef } from "react";
import { GetStates, GetPositions } from "../../helpers/states.js";
import { WeatherInfo } from "../../helpers/weatherInfo.js";
import { motion } from "framer-motion"
import WindUrl from "../../public/wind.svg"
import Leaf from "../../public/leaf.svg"
import Cloud from "../../src/assets/cloud.svg?react"
import { useControl } from "../../toolbox/controls/useControl.jsx";
import { ThreeDText } from "../../toolbox/Effects/threeDText.jsx";
import{SmokeEffects} from"../../toolbox/Effects/smokeEffects.jsx"
import WaterDrop from "../../src/assets/waterDrop.svg";

export function Weather() {
  //use control context to get global states
  const {
    label,
    setLabel,
    retMethod,
    setRetMethod,
    stateLat,
    stateLong,
    getLat,
    setGetLat,
    getLong,
    setGetLong,
  } = useControl();

  //choose what to use based on retMethod
  const lat = retMethod === "state" ? stateLat : getLat;

  const long = retMethod === "state" ? stateLong : getLong;

  //fetch weather info based on lat and long
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
    //start of main container
    <div className="border-t-3 !border-black grid grid-cols-2">

      {/* left side nav */}
      <div className="gpu-accelerated-text !text-[clamp(1.5rem,4vw,6rem)] mx-auto relative col-span-1 w-full h-full pt-3 w-fit">
        <div className="inset-0"><SmokeEffects text={true} myText='💧' />
        </div>
        
        <ThreeDText title="Weather Console" begin="☁️" end="☁️" startEnd={true} className="!text-[clamp(.8rem,1vw,6rem)]
        text-center " 
        threeDAlignment="top-[clamp(0.1rem,.4vw,1rem)] right-[clamp(0.3rem,.4vw,1rem)]"/>
      </div>


      {/* top selection area */}
      <div className="grid grid-cols-2 gap-l-2 w-full border-b-3 h-full w-full !border-black">
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
        w-9/10 
        border-l-5 border-b-5 border-l-3 border-r-3 border-t-3 border-black
        bg-green-600
        mx-auto
        p-4
        relative
        ">

          <p className="text-center bg-green-600 border-l-5 border-b-5 border-r-5 border-t-3 border-black
          text-[clamp(.8rem,1.5vw,2rem)]">
            Welcome To The Weather Console!
          </p>
          {/* lat/long inputs */}
          <div className="
          p-2
          flex flex-col 
          md:flex-col md:m-2
          lg:grid lg:grid-cols-2
          gap-0 md:gap-2 justify-items-center align-items-center
          ">
            {/*left side lat input*/}
            <div className=" border-l-6 border-r-3 border-t-4 border-b-7 text-center pb-3 border-black ">
              <label>Latitude:</label>
              <input
                type="number"
                value={getLat}
                onChange={(e) => setGetLat(e.target.value)}
                className={`${labelClass} border-t-2 border-b-2 
                focus:outline-none focus:border-l-6 focus:border-r-3 focus:border-b-6 focus:border-t-3
                p-0 w-full h-full
                `}
              />
            </div>
            {/*right side long input*/}
              <div className="
            border-l-3 border-r-6 border-t-4 border-b-7 text-center pb-3 border-black
            
            ">
                <label>Longitude:</label>
                <input
                  type="number"
                  value={getLong}
                  onChange={(e) => setGetLong(e.target.value)}
                  className={`${labelClass} border-r-2 border-l-2
                focus:outline-none focus:border-r-6 focus:border-l-3 focus:border-b-6 focus:border-t-3
                p-1 
                w-9/10 h-full`}

                />
              </div>
            

            <div className="mx-auto col-span-2 mt-4 w-full h-full">
              <button
                className="bg-green-600 text-white p-2 border-b-7 border-l-4 border-t-3 border-r-4
            hover:border-b-2 hover:border-l-2 hover:border-t-1 hover:border-r-2
            border-black
            !text-black
            border-transparent
            absolute
            left-1/2 -translate-x-1/2
            "
                onClick={() => {
                  setRetMethod("coords");
                }}
              >
                Get Weather
              </button>
            </div>
          </div>
        </div>


        {/*Display of Coordinates*/}
        {/* lets practice contorl. I have a original grid that takes up 2 splaces */}
        <div className="mx-10 mt-4 col-span-2 
      border-b-6 border-l-5 border-r-5 border-t-4 bg-green-600 mb-2 border-black">
          {/* nested grid for content which splits to 2 columns */}
          <div className="grid grid-cols-2">
            {/* left side shows method used */}
            <div className="col-span-1 align-content-center ">
              {/* I want a 2 row grid inside here, flex flex-col allows for proper spacing*/}
              <div className="flex flex-col text-center border-r-3 pb-1 ">
                <p className="border-l-4 border-r-4 border-b-4 mb-0 mx-10 font-bold border-black">
                  Selected Method
                </p>
                <p className="border-l-5 border-r-5 mx-15 border-b-4 border-b-8 mb-0 font border-black">
                  {retMethod === "state" ? "State Coordinates" : "User Coordinates"}
                </p>
              </div>
            </div>
            {/* right side shows coordinates used test*/} 
            <div className="col-span-1 my-auto ">
              <div className="grid grid-cols-2 text-center">
                <p className="mt-0 mb-0 col-span-1 mx-2
              border-b-4 border-l-4 border-r-4 border-t-2
              shadow-lg border-black">
                  Latitude: {retMethod === "state" ? lat : getLat}
                </p>
                <p className="mt-0 mb-0 col-span-1 mx-2
              border-b-4 border-l-4 border-r-4 border-t-2
              shadow-lg border-black">
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
          {/* Weather info start*/}
          <div className="border-2 w-8/12 mt-10 mx-auto 
        font-extrabold
        text-[clamp(1rem,2vw,4rem)]
        font-shadowy
        mb-10
        !bg-green-600
        relative
        text-black">

            {description !== "clear sky" ?
              <div className="absolute w-full mt-0 top-0"
                style={{ opacity: .5 }}>

                <Cloud className="mx-auto w-[clamp(5rem,15vw,20rem)] h-[clamp(5rem,15vw,20rem)] animate-pulse
          text-white
          [&_*]:stroke-current /* all children within <Cloud>, stroke current color */
          [&_*]:fill-cyan-200 /* all children within <Cloud>, fill cyan-200 */
          -z-100
          "
                />

              </div> : null}
            <p className="relative text-center mb-0 underline hover:scale-150 hover:border-b-3 hover:border-r-2 hover:border-l-2 hover:border-t-2 hover:w-5/10 hover:mx-auto z-[10]">
              Location: {name}
            </p>
            <div className="grid sm:grid-cols-1 md:grid-cols-3 p-5 text-center">
              <p className="mt-0 pt-0 top-0 text-start hover:scale-150 hover:mx-auto  z-10" style={{ transform: "rotate(-10deg)" }}>
                {temp}°F
              </p>
              <p className="hover:scale-150 z-10">Condition: {description}</p>
              <div className="col-span-1 relative  w-full overflow-hidden mt-2 py-2"
                style={{ zIndex: 0 }}>
                {windSpeed >= 0.1 &&
                  <div className="transform-origin-center">
                    <motion.img src={Leaf} alt="Leaf Icon"
                      className={`w-[clamp(2rem,4vw,5rem)] h-[clamp(2rem,4vw,5rem)] absolute top-0`}
                      key={`${windSpeed}-${windDeg}`} // when windspeed changes update the speed or when winddeg;)
                      style={{ zIndex: 1 }}
                      initial={{ left: '0%', x: '0%', rotate: `0deg`, opacity: .4 }} // start at left side, x 0
                      animate={{ left: ['0%', '100%'], x: ['0%', '-100%'], rotate: ['0deg', '15deg', '0deg', '-15deg'], opacity: [.4, 1, .8, 0, 1.4] }} // move to right side, x moves left to simulate movement
                      transition={{
                        x: { repeat: Infinity, repeatType: "loop", duration: 20 / windSpeed, ease: "linear" }, //
                        rotate: { repeat: Infinity, duration: 20 / windSpeed, ease: "linear" },
                        left: { repeat: Infinity, repeatType: "loop", ease: "linear", duration: 20 / windSpeed },
                        opacity: { repeat: Infinity, repeatType: "mirror", duration: 20 / windSpeed, ease: "linear" },
                      }}
                    />
                  </div>
                }
                <p className="text-end hover:scale-150 hover:mx-auto p-1  z-10" style={{ transform: "rotate(10deg)" }} >{windSpeed}
                  Mph Winds
                </p>
              </div>
              <p className="hover:scale-150  z-10">Pressure: {pressure} hPa</p>
              <p className="hover:scale-150  z-10">Humidity: {humidity}%</p>
              <p className="hover:scale-150  z-10">Sea Level: {seaLevel} hPa</p>
              <div className="col-span-1">
                <p className="mb-0 pb-0 hover:scale-150  z-10">Wind Direction: {windDeg}°</p>
                {/* svg gets uploaded here */}
                <div className="w-[clamp(2rem,6vw,8rem)] h-[clamp(2rem,6vw,8rem)] mx-auto">
                  <img src={WindUrl} alt="Wind Direction Icon"
                    className="mx-auto"
                    style={{ transform: `rotate(${windDeg + 180}deg)` }}
                  />
                </div>
              </div>
              <p className="hover:scale-150  z-10">Cloudiness: {cloudiness}%</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
