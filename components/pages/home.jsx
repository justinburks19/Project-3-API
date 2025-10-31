import { React, useEffect } from "react";
import {Button} from "../../toolbox/btncontrol/button.jsx";
import { UseTimeTheme } from "../../helpers/useTimeTheme.js";
import { Weather } from "./Weather.jsx";

export function Home() {
  const { bg = {}, borderClass = "" } = UseTimeTheme(); // Get time-based theme which returns bg and borderClass objects.
  const buttons = [
    {label: "Weather Api", background: "bg-green-600", borders: "border-t-3 border-r-3 border-b-7 border-l-5 p-2 4-2", hover: "hover:border-b-2 hover:border-l-2 hover:border-t-2", onClick: () => <Weather />}, //btn 1
    {label: "Movie Api", background: "bg-blue-700", borders: "border-t-3 border-r-4 border-b-7 border-l-4 p-2", hover: "hover:border-b-2 hover:border-l-2 hover:border-r-1 hover:border-t-2", onClick: () => handleButtonClick("Movie Api")}, //btn 2
    {label: "Crypto Api", background: "bg-purple-600", borders: "border-t-3 border-r-3 border-b-7 border-l-2 p-2", hover: "hover:border-b-2 hover:border-r-2 border-t-1 hover:border-t-2", onClick: () => handleButtonClick("Crypto Api")}]; //btn 3

  // Calculate middle index for centering
  const middleOfButtons = Math.floor(buttons.length / 2); // Calculate middle index for centering
  const center = buttons[middleOfButtons]; // Get center button label
  //

  return (
    // Home Page Container
    <div className={`min-h-screen flex flex-col p-4 ${borderClass}`} style={{ ...bg }}>
      {/* Animated Title */}
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
      

      {/* start of Button Grid */}
      <div className="wrapper ml-auto mr-auto mt-40 border-5 !border-t-4 w-full max-w-50/100">
      {/* Top of Grid X*/}
      <div className="header-text w-full border-b-3 ">
        <Button className="!p-1 !m-1 bg-black text-slate-500 font-bold !text-red-500 !border-2 !hover:border-red-500 !text-[clamp(.7rem,.7vw,1rem)]" >
          X
        </Button>
      </div>

        <div className={`grid grid-cols-3 p-2 justify-items-inbetween items-center`}>
        {buttons.map(({label, index, background, borders, hover}) => (
          <div key={index} className="grid-col-span-1 p-2">
            <Button 
            className={`${background} ${borders} ${hover} !text-[clamp(1rem,1.2vw,2rem)] w-full`}>{label}
            </Button>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}
