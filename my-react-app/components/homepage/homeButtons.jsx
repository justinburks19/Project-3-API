import { Button } from "../../toolbox/btncontrol/button.jsx";
import { useControl } from "../../toolbox/controls/useControl.jsx";
import { Weather } from "../pages/weather.jsx";
import { motion } from "framer-motion";
import { useState } from "react";
export function HomeButtons() {
  const { show, setShow, exit, setExit, hover, setHover, pageTracker, setPageTracker } = useControl(); // Get control states and setters

  // Button definitions with styles and hover effects
  const buttons = [
    { label: "Home", background: "bg-orange-500" }, //btn 4
    { label: "Weather Api", background: "bg-green-600" }, //btn 1
    { label: "Movie Api", background: "bg-blue-700" }, //btn 2
    { label: "Crypto Api", background: "bg-purple-600" }, //btn 3
  ];

  // Handle button clicks to set content based on label
  const buttonClicks = ({ label }) => {
    switch (label) {
      case "Home":
        setPageTracker("Home");
        setShow(null);
        break;
      case "Weather Api":
        setPageTracker("Weather Api");
        setShow(<Weather />);
        break;
      case "Movie Api":
        setPageTracker("Movie Api");
        setShow(<div className="text-white text-center mt-10">Movie Api Coming Soon!</div>);
        break;
      case "Crypto Api":
        setPageTracker("Crypto Api");
        setShow(<div className="text-white text-center mt-10">Crypto Api Coming Soon!</div>);
        break;
      default:
        setShow(null);
    }
  }
  return (
    <>
      {/* Main container for buttons */}

      <div className={`mx-auto`}>
        {/* Top of Grid X*/}
        <div className={`grid grid-cols-12 justify-items-inbetween items-center justify-center  rounded-top-5 w-full `}>

          {buttons.map(({ label, index, background, borders, hover }) => (
            !exit && (

              <div key={index} className={`px-1 ${label === "Home" ? "col-span-6 !w-3/10 mx-auto" : "col-span-2"} w-full`}>
                
                <Button
                  className={`${background} ${borders} ${hover} !text-[clamp(1rem,1.2vw,2rem)] w-full font-bold rounded-5
                border-t-7 border-r-7 border-b-10 border-l-7 p-2 4-2 
                border-slate-700
                hover:border-b-4 hover:border-l-4 hover:border-t-4 hover:border-r-4
                
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
        <div className={`border-b-5 
      ${hover === "Weather Api" ? '!border-green-600' :
            hover === "Movie Api" ? '!border-blue-700' :
              hover === "Crypto Api" ? '!border-purple-600' :
                hover === "Home" ? '!border-orange-500' : null} 
                ${pageTracker === "Weather Api" ? '!border-green-500' :
                    pageTracker === 'Movie Api' ? 'border-blue-500' : 
                      pageTracker === 'Crypto Api' ? 'border-purple-500' : 
                        pageTracker === 'Home' ? 'border-orange-500' : 'border-slate-700'}`}>

        </div>


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
      </div>
    </>
  );
}