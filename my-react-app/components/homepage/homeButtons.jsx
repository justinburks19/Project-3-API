import { Button } from "../../toolbox/btncontrol/button.jsx";
import { useControl } from "../../toolbox/controls/useControl.jsx";
import { Weather } from "../pages/weather.jsx";
import { motion} from "framer-motion";
export function HomeButtons() {
  const { show, setShow, exit, setExit } = useControl();
  // Button definitions with styles and hover effects
  const buttons = [
    { label: "Weather Api", background: "bg-green-600", borders: "border-t-3 border-r-3 border-b-7 border-l-5 p-2 4-2", hover: "hover:border-b-2 hover:border-l-2 hover:border-t-2" }, //btn 1
    { label: "Movie Api", background: "bg-blue-700", borders: "border-t-3 border-r-4 border-b-7 border-l-4 p-2", hover: "hover:border-b-2 hover:border-l-2 hover:border-r-1 hover:border-t-2 " }, //btn 2
    { label: "Crypto Api", background: "bg-purple-600", borders: "border-t-3 border-r-3 border-b-7 border-l-2 p-2", hover: "hover:border-b-2 hover:border-r-2 border-t-1 hover:border-t-2" }]; //btn 3

  // Handle button clicks to set content based on label
  const buttonClicks = ({ label }) => {
    label === "Weather Api" ? setShow(<Weather />) :
      label === "Movie Api" ? "" :
        label === "Crypto Api" ? "" :
          setShow(<></>); //default case
  }
  return (
    <>
    {/* Main container for buttons */}
    
    <div className={`mx-auto`}>
      {/* Top of Grid X*/}

      <div className={`flex flex-row justify-items-inbetween items-center !border-black justify-center bg-black rounded-5 w-full`}>

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

      {/* Bottom of Grid X*/}

      {/* remove the button if i click a top button, same as title*/}
      {!show && 
      <div className={`relative header-text w-full grid grid-cols-1`}>
        <p className="text-red-600 text-[clamp(.7rem,1vw,2rem)] justify-self-center">{exit ?
          <motion.span
            className="inline-block transform-gpu will-change-transform"
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: [1, 0], scale: [1, 2] }}
            transition={{
              opacity: { duration: 10, repeat: Infinity, repeatType:"mirror" },
              scale: { duration: 10, repeat: Infinity, repeatType:"mirror" }
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