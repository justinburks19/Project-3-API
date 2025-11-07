import { WeatherInfo } from "../../helpers/weatherInfo.js";
import { useControl } from "../../toolbox/controls/useControl.jsx";
import Leaf from "../../public/leaf.svg";
import { motion } from "framer-motion";
import Cloud from "../../src/assets/cloud.svg?react";
import WindUrl from "../../public/wind.svg";
import { ThreeDText } from "../../toolbox/Effects/threeDText.jsx";

//bottom page component to show weather info
export function BottomPage() {
   const {
     retMethod,
     stateLat,
     stateLong,
     getLat,
     getLong,
      fireup,
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
  
    return (
      <>
           {/* Weather info start*/}
           
           
          <div className="border-2 mt-0  
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
              <ThreeDText title={name ? `Weather in ${name}` : "Weather Info"} className="!text-[clamp(1.5rem,3vw,4rem)] text-center mb-0"/>
            
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
    );
    

}