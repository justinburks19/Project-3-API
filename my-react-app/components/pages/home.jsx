import { React, useEffect } from "react";
import { Button } from "../../toolbox/btncontrol/button.jsx";
import { UseTimeTheme } from "../../helpers/useTimeTheme.js";
import { Weather } from "./weather.jsx";
import { useState } from "react";
import { ThreeDText } from "../../toolbox/Effects/threeDText.jsx";
import { SmokeEffects } from "../../toolbox/Effects/smokeEffects.jsx";


//Lego play ;)
//clean and orginzed up!
export function Home() {
  const [show, setShow] = useState(null);
  const { bg = {}} = UseTimeTheme(); // Get time-based theme which returns bg and borderClass objects.
  const [exit, setExit] = useState(false);

  const buttons = [
    { label: "Weather Api", background: "bg-green-600", borders: "border-t-3 border-r-3 border-b-7 border-l-5 p-2 4-2", hover: "hover:border-b-2 hover:border-l-2 hover:border-t-2" }, //btn 1
    { label: "Movie Api", background: "bg-blue-700", borders: "border-t-3 border-r-4 border-b-7 border-l-4 p-2", hover: "hover:border-b-2 hover:border-l-2 hover:border-r-1 hover:border-t-2 " }, //btn 2
    { label: "Crypto Api", background: "bg-purple-600", borders: "border-t-3 border-r-3 border-b-7 border-l-2 p-2", hover: "hover:border-b-2 hover:border-r-2 border-t-1 hover:border-t-2" }]; //btn 3


  const buttonClicks = ({ label }) => {
    label === "Weather Api" ? setShow(<Weather />) :
      label === "Movie Api" ? "" :
        label === "Crypto Api" ? "" :
          setShow(<></>); //default case
  }

  return (
    // Home Page Container
    <>
    <div className={'min-h-dvh flex flex-col relative'}> {/* dvh for better mobile vh handling */}
      {/* Outer Container */}
      <div className={`min-h-screen border-r-15 border-t-15 border-b-20 border-l-20 border-black relative bg-black`}>
        {/* Inner Container */}
        <div className={` border-5 border-green-700 absolute inset-0 shadow-lg rounded-5`}style={{ ...bg, }}> 
          {!show && <SmokeEffects />}
        {/* start of Button Grid */}
        <div className={`wrapper ml-auto mr-auto mt-10 border-5 !border-t-4 w-full max-w-50/100 !border-black
        ${show ? `max-w-90/100 font-blue-500` : "max-w-50/100"} `}>
          {/* Top of Grid X*/}
          <div className="header-text w-full border-b-3 ">
            <Button className="!p-1 !m-1 bg-black text-slate-500 font-bold !text-red-500 !border-2 !hover:border-red-500 !text-[clamp(.7rem,.7vw,1rem)]"
              onClick={() => setExit(!exit)}>
              X
            </Button>
          </div>

          <div className={`grid grid-cols-3 p-2 justify-items-inbetween items-center !border-black`}>

            {buttons.map(({ label, index, background, borders, hover }) => (
              !exit && (
                <div key={index} className="grid-col-span-1 p-2 !border-black">
                  <Button
                    className={`${background} ${borders} ${hover} !text-[clamp(1rem,1.2vw,2rem)] w-full ${label === "Movie Api" || label === "Crypto Api" ? "hover:opacity-50 !cursor-not-allowed" : "text-black"} font-bold`}
                    onClick={() => buttonClicks({ label })}>{label}
                  </Button>
                </div>
              )
            ))}
          </div>
          
          <div>{!exit && show}</div>
        </div>
      </div>
      {!show && (
        <div className="absolute top-2/4 w-full">
          <ThreeDText title="Project 3" begin="🔥" end="🔥" startEnd={true} />

        </div>
        )}
    </div>
    </div>
    </>

  );

}



