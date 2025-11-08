import { Button } from "../../toolbox/btncontrol/button.jsx";
import { useControl } from "../../toolbox/controls/useControl.jsx";
import { Weather } from "../pages/weather.jsx";
import { motion } from "framer-motion";
import { useState } from "react";
import { Home } from "../pages/home.jsx";
export function HomeButtons() {
  const { show, setShow, exit, setExit, hover, setHover, pageTracker, setPageTracker } = useControl(); // Get control states and setters

  // Button definitions with styles and hover effects
  const buttons = [
    { label: "Home", background: "bg-orange-500" }, 
    { label: "Weather", background: "bg-green-600" }, 
    { label: "Movie", background: "bg-blue-700" }, 
    { label: "Crypto", background: "bg-purple-600" },
  ];

    const pageColor = {
    Weather: "border-green-500 brightness-125",
    Movie:   "border-blue-500 brightness-125",
    Crypto:  "border-purple-500 brightness-125",
    Home:    "border-orange-500 brightness-125",
  };

  const hoverColor = {
    Weather: "border-green-600",
    Movie:   "border-blue-600",
    Crypto:  "border-purple-600",
    Home:    "border-orange-600",
  };

  const activeUnderline = hover ? hoverColor[hover] : pageColor[pageTracker];

  // Handle button clicks to set content based on label
  const buttonClicks = ({ label }) => {
    switch (label) {
      case "Home":
        setPageTracker("Home");
        setShow(null);
        break;
      case "Weather":
        setPageTracker("Weather");
        setShow(<Weather />);
        break;
      case "Movie":
        setPageTracker("Movie");
        setShow(<div className="text-white text-center mt-10">Movie Api Coming Soon!</div>);
        break;
      case "Crypto":
        setPageTracker("Crypto");
        setShow(<div className="text-white text-center mt-10">Crypto Api Coming Soon!</div>);
        break;
      default:
        setShow(null);
    }
  }
  return (
    <>
      {/* Main container for buttons */}

      
        {/* Top of Grid X*/}
        <div className={`flex flex-rows rounded-top-5 w-full my-2 justify-between`}>
          
          {buttons.map(({ label, index, background, borders, hover }) => (
            !exit && (

              <div key={index}>
                
                <Button
                  className={`${background} ${borders} ${hover} !text-[clamp(.7rem,1.2vw,2rem)] font-extrabold rounded-5
                border-t-7 border-r-7 border-b-10 border-l-7 
                border-slate-700
                hover:border-b-4 hover:border-l-4 hover:border-t-4 hover:border-r-4
                !w-[clamp(4.3rem,8vw,12rem)] 
                
                `}
                  onMouseEnter={() => setHover(label)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => buttonClicks({ label })}>{label}

                </Button>

              </div>


            )
          ))}
        </div>
        {/* Bottom line*/}
        <div className={`w-full ${!exit ? "border-b-2" : ""} ${activeUnderline} `} />


        {/* Bottom of Grid X*/}

        {/* remove the button if i click a top button, same as title*/}
        {!show &&
          <div className={`relative header-text w-full grid grid-cols-1`}>
            <p className="text-red-600 text-[clamp(1.5rem,3vw,5rem)] justify-self-center">{exit ?
              <motion.span
                className="inline-block transform-gpu will-change-transform"
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: [1, 0], scale: [1, 2] }}
                transition={{
                  opacity: { duration: 10, repeat: Infinity, repeatType: "mirror" },
                  scale: { duration: 10, repeat: Infinity, repeatType: "mirror" }
                }}>Enjoy the view Professor!</motion.span> : "Do Not Press"}</p>
            <Button className={`!p-1 !m-1 bg-black text-slate-500 font-bold !text-red-500 !border-green-600 !border-2 !hover:border-red-500 !text-[clamp(.7rem,.7vw,1rem)] w-1/10 justify-self-center`} disabled={exit}
              onClick={() => setExit(!exit)}>
              {exit ? "Restart" : "Exit"}
            </Button>
          </div>
        }

        <div>{!exit && show}</div>
      
    </>
  );
}