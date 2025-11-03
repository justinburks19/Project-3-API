import { React, useEffect } from "react";
import {Button} from "../../toolbox/btncontrol/button.jsx";
import { UseTimeTheme } from "../../helpers/useTimeTheme.js";
import { Weather } from "./weather.jsx";
import {useState} from "react";

export function Home() {
  const [show, setShow] = useState(null);
  const { bg = {}, borderClass = "" } = UseTimeTheme(); // Get time-based theme which returns bg and borderClass objects.
  const [exit, setExit] = useState(false);

  const buttons = [
    {label: "Weather Api", background: "bg-green-600", borders: "border-t-3 border-r-3 border-b-7 border-l-5 p-2 4-2", hover: "hover:border-b-2 hover:border-l-2 hover:border-t-2"}, //btn 1
    {label: "Movie Api", background: "bg-blue-700", borders: "border-t-3 border-r-4 border-b-7 border-l-4 p-2", hover: "hover:border-b-2 hover:border-l-2 hover:border-r-1 hover:border-t-2 "}, //btn 2
    {label: "Crypto Api", background: "bg-purple-600", borders: "border-t-3 border-r-3 border-b-7 border-l-2 p-2", hover: "hover:border-b-2 hover:border-r-2 border-t-1 hover:border-t-2"}]; //btn 3


  const buttonClicks = ({label}) => {
    label === "Weather Api" ? setShow(<Weather />) : 
    label === "Movie Api" ? "" :
    label === "Crypto Api" ? "" :
    setShow(<></>); //default case
  }

  return (
    // Home Page Container
    <div className={`min-h-screen flex flex-col p-1 font-test ${borderClass} !border-black`} style={{ ...bg } }>
      {/* Animated Title */}
      {!show && (
      <h1 className="!text-[clamp(2rem,8vw,12rem)] mt-3 ml-auto mr-auto relative font-gta text-white">
        <span className="relative">
          Project 3
        </span>

        <div>
        <span className="absolute top-4 left-0 w-full opacity-20 hover:top-0 transition-all duration-300 cursor-pointer">
          Project 3
        </span>
        </div>
      </h1>
      )}
      
      
      {/* start of Button Grid */}
      <div className={`ml-auto mr-auto mt-10 border-5 !border-t-4 w-full max-w-50/100 !border-black
        ${show ? `max-w-90/100 font-blue-500` : "max-w-50/100"} `}>
      {/* Top of Grid X*/}
      <div className="header-text w-full border-b-3 my-auto flex content-start-end flex flex-row-reverse">
        <div>
        <Button className="!p-1 !m-1 bg-black text-slate-500 font-bold !text-red-500 !border-2 !hover:border-red-500 !text-[clamp(.7rem,.7vw,1rem)] !rounded-none " 
        onClick={() => setExit(!exit)}>
          X
        </Button>
        </div>
      </div>

        <div className={`grid grid-cols-3 p-2 justify-items-inbetween items-center !border-black`}>

        {buttons.map(({label, index, background, borders, hover}) => (
          !exit && (
            <div key={index} className="grid-col-span-1 p-2 !border-black">
              <Button 
                className={`
                  
                  ${background} ${borders} ${hover} !text-[clamp(1rem,1.5vw,3rem)] w-full ${label === "Movie Api" || label === "Crypto Api" ? "hover:opacity-50 !cursor-not-allowed" : "text-black"} font-bold`}
                onClick={() => buttonClicks({label})}>{label}
              </Button>
            </div>
          )
        ))}
      </div>
      <div>{!exit && show}</div>
    </div>
    </div>
    
  );
}
