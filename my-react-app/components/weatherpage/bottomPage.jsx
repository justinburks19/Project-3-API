import { WeatherInfo } from "../../helpers/weatherInfo.js";
import { useControl } from "../../toolbox/controls/useControl.jsx";
import Leaf from "../../public/leaf.svg";
import { motion, transform } from "framer-motion";
import Cloud from "../../src/assets/cloud.svg?react";
import WindUrl from "../../public/wind.svg";
import { ThreeDText } from "../../toolbox/Effects/threeDText.jsx";
import { useEffect } from "react";

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
  const info = [{ label: "Temperature", value: temp + "°F" },
  { label: "SkyView", value: description},
  { label: "Pressure", value: pressure },
  { label: "Humidity", value: humidity },
  { label: "Sea Level", value: seaLevel },
  { label: "Wind Speed", value: windSpeed },
  { label: "Wind Degree", value: windDeg },
  { label: "Cloudiness", value: cloudiness },
  ]


  return (
    <div >
      {/* Weather info start*/}


      {getLat > 90 || getLat < -90 || getLong > 180 || getLong < -180 ? (
        <div className="flex min-h-[30vh]">
          <div className="text-red-600 font-bold text-center
        text-[clamp(1rem,2vw,4rem)]
        mx-auto
        my-auto
        ">
            Please enter valid coordinates.
          </div>
        </div>
      )
        : isLoading ? (
          <div className="flex min-h-[30vh]">
            <div className="text-blue-600 font-bold text-center 
            text-[clamp(1rem,2vw,4rem)]
            mx-auto
            my-auto
            ">
              <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "easeInOut" }}
              className="h-6 rounded-xl bg-slate-200 w-5/10 animate-pulse mx-auto" />
              Collecting Data... Please wait
            </div>
          </div>)
          : error ? (
            <div className="flex min-h-[30vh]">
              <div className="text-red-600 font-bold text-center
        text-[clamp(1rem,2vw,4rem)]
        mx-auto
        my-auto
        ">
                Error fetching data: {error}
              </div>
            </div>
          ) : (

            <div className=" mt-0  
        font-extrabold
        text-[clamp(1rem,2vw,4rem)]
        font-shadowy
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

              <ThreeDText title={name ? `Weather in ${name}` : "Weather Info"} className="!text-[clamp(1.5rem,2vw,4rem)] text-center" color="!text-blue-600" threeDAlignment="top-[clamp(0.2rem,.4vw,1rem)] right-[clamp(0.3rem,.4vw,1rem)]"/>
              <div className="grid sm:grid-cols-3 md:grid-cols-4 grid-cols-4">
                {info.map((item, i) => (
                  <div key={i}
                    className={`text-blue-600 border-green-500 border-2 flex flex-col
              wx-9/10 justify-center items-center m-2 rounded-2`}>
                    <h1 className="!font-extrabold border-x-2 border-b-2 border-green-500 rounded-2 !text-[clamp(0.9rem,2vw,4rem)] p-1">{`${item.label }`}</h1>
                    <h1 className="!text-[clamp(1rem,2.3vw,3rem)]">{`${item.value}`}</h1>
                  </div>
                ))}
              </div>
            </div>
          )}

      {/* Weather info end*/}
      <div className="border-green-500 h-[clamp(2rem,13vw,15rem)]" /> {/* add more effects ;) */}
    </div>
  );


}