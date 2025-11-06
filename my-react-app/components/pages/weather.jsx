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
import { SmokeEffects } from "../../toolbox/Effects/smokeEffects.jsx"
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
    fireup, 
    setFireup,
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


  ] = WeatherInfo(lat, long, fireup); //call weather info with lat and long. only change when fireup changes



  //cordinates edits
  const labelClass = "hover:cursor-pointer w-8/10";
  return (
    //start of main container
    <div className=" border-t-3 !border-black flex flex-row"> {/* creates two column grid */}

      {/* left side nav */}
      <div className="relative gpu-accelerated-text col-span-1 pt-3 h-full border-black overflow-hidden ">
        <div className="absolute w-full h-full top-[-8%]">
          <SmokeEffects text={true} myText='💧' />
        </div>

        {/* Weather Console centering */}
        <div className=" mx-auto">
          <ThreeDText title="Weather Console" begin="☁️" end="☁️" startEnd={true} className="!text-[clamp(.8rem,3vw,6rem)]
        text-center " threeDAlignment="top-[clamp(0.1rem,.4vw,1rem)] right-[clamp(0.3rem,.4vw,1rem)]" />

          {/* Select State Text*/}
        </div>
        <div className="text-center">
          <ThreeDText title="Select State" className="!text-[clamp(.5rem,2vw,3rem)]
          text-center " threeDAlignment="top-[clamp(0.1rem,.4vw,1rem)] right-[clamp(0.3rem,.4vw,1rem)]"
            delay={3} />
        </div>

        {/* state dropdown */}
        <div className="flex flex-col mx-auto mt-1">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5, duration: 1, ease: "easeIn" }}
            className="flex justify-content-center">
            <DropDown
              label={label}
              items={GetStates()}
              menueClass="!bg-green-600 !text-black !text-[clamp(1rem,2vw,2rem)] hover:cursor-pointer !shadow-2xl 
            border-b-5 border-l-5 border-t-3 border-r-3
            hover:border-b-3 hover:border-l-3 hover:border-t-2 hover:border-r-2
            border-black
            "
              buttonClass="!bg-blue-500 !text-black hover:cursor-pointer "
              listItemClass={`!border-b-6 !border-t-4 !border-l-6 !border-r-6 
              !hover:border-b-2 !hover:border-l-2 !hover:border-r-1
              `}
              ulClass="!p-1 !bg-green-600"
              onSelect={(label) => {
                setLabel(label);
                setRetMethod("state");
                setFireup(!fireup);
              }} // Update label on selection
            />
          </motion.div>

          <ThreeDText title="OR" className="!text-[clamp(.5rem,2vw,3rem)]
          text-center " threeDAlignment="top-[clamp(0.1rem,.4vw,1rem)] right-[clamp(0.3rem,.4vw,1rem)]"
            delay={4} />
          <ThreeDText title="Enter Coordinates" className="!text-[clamp(.5rem,2vw,3rem)]
          text-center mb-5" threeDAlignment="top-[clamp(0.1rem,.4vw,1rem)] right-[clamp(0.3rem,.4vw,1rem)]"
            delay={4.2} />

          {/* flex row start for lat/long*/}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.5, duration: 1, ease: "easeIn" }}
            className="flex flex-row border-green-600 border-5 h-full ">
            {/* lat input */}
            <div className=" border-x-5 border-black bg-green-600 border-b-1 flex flex-row">
              <label className="my-auto !text-[clamp(1rem,2vw,3rem)] mx-2">X:</label>
              <input
                type="number"
                value={getLat}
                onChange={(e) => setGetLat(e.target.value)}
                className={`${labelClass} text-center
                !text-[clamp(1rem,2vw,3rem)]
                z-10 focus:outline-none
                `}
              />
            </div>
            {/* long input */}
            <div className=" border-r-5 border-black bg-green-600 border-b-1 flex flex-row">
              <label className="my-auto !text-[clamp(1rem,2vw,3rem)] mx-2 ">Y:</label>
              <input
                type="number"
                value={getLong}
                onChange={(e) => setGetLong(e.target.value) }
                className={`${labelClass} 
                focus:outline-none h-full w-full text-center
                !text-[clamp(1rem,2vw,3rem)]
                z-10 
                
                `}

              />
            </div>
            <div className="z-10">
              <button
                className="bg-green-600 text-white p-2
            border-black
            !text-black
            w-full
            h-full
            "
            onClick={() => { setRetMethod("coords"); setFireup(!fireup); }}
              >
                Get Weather
              </button>
            </div>
          </motion.div>
        </div>


      </div>




      {/*weather info*/}
      {isLoading && <p>Loading weather data...</p>}
      {temp === "N/A" ? <p className="text-red-500">Error: {error}</p> : (
        <>
          {/* Weather info start*/}
          <div className="border-2 w-8/12 mt-0  
        font-extrabold
        text-[clamp(1rem,2vw,4rem)]
        font-shadowy
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
            <div className="grid sm:grid-cols-1 md:grid-cols-5 p-5 text-center">
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
