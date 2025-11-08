import { useControl } from "../../toolbox/controls/useControl.jsx";
import { DropDown } from "../../toolbox/dropdownbtns/dropdown.jsx";
import { GetStates } from "../../helpers/states.js";
import { motion } from "framer-motion";
import { ThreeDText } from "../../toolbox/Effects/threeDText.jsx";
import { SmokeEffects } from "../../toolbox/Effects/smokeEffects.jsx";

export function TopPage() {
  const {
    label,
    setLabel,
    setRetMethod,
    getLat,
    setGetLat,
    getLong,
    setGetLong,
    fireup,
    setFireup,
  } = useControl();
  return (
    <div className="relative gpu-accelerated-text pt-3 w-full overflow-hidden shrink-0">
      {/* Weather Console centering */}
      <div className=" mx-auto">
        <ThreeDText
          title="Weather Console"
          begin="☁️"
          end="☁️"
          startEnd={true}
          className="!text-[clamp(1.5rem,3vw,6rem)]
         text-center "
          threeDAlignment="top-[clamp(0.2rem,.4vw,1rem)] right-[clamp(0.3rem,.4vw,1rem)]"
        />

        {/* Select State Text*/}
      </div>
      <div className="justify-center mx-auto">
        <ThreeDText
          title="Select State"
          className="!text-[clamp(1.2rem,2vw,3rem)]
           text-center "
          threeDAlignment="top-[clamp(0.1rem,.4vw,1rem)] right-[clamp(0.3rem,.4vw,1rem)]"
          delay={2}
        />
      </div>

      {/* state dropdown */}
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1, ease: "easeIn" }}
          className="flex justify-content-center mx-auto "
        >
          <DropDown
            label={label}
            items={GetStates()}
            menueClass="!bg-green-600 !text-black !text-[clamp(1rem,2vw,2rem)] hover:cursor-pointer !shadow-2xl  
             "
            buttonClass="!bg-blue-500 !text-black hover:cursor-pointer border-9"
            listItemClass={`!border-b-6 !border-t-4 !border-l-6 !border-r-6 
               !hover:border-b-2 !hover:border-l-2 !hover:border-r-1
               `}
            ulClass="!p-1 !bg-green-600 !max-h-[20vh]"
            onSelect={(label) => {
              setLabel(label);
              setRetMethod("state");
              setFireup(!fireup);
              setGetLat("");
              setGetLong("");
            }} // Update label on selection
          />
        </motion.div>

        <ThreeDText
          title="OR"
          className="!text-[clamp(2rem,2vw,4rem)]
           text-center "
          threeDAlignment="top-[clamp(0.2rem,.4vw,1rem)] right-[clamp(0.3rem,.4vw,1rem)]"
          delay={2.5}
        />
        <ThreeDText
          title="Enter Coordinates"
          className="!text-[clamp(1rem,2vw,3rem)]
           text-center mb-1"
          threeDAlignment="top-[clamp(0.1rem,.4vw,1rem)] right-[clamp(0.3rem,.4vw,1rem)]"
          delay={2.8}
        />

        {/* flex row start for lat/long*/}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.9, duration: 1, ease: "easeIn" }}
          className="flex flex-row justify-center"
        >
          {/* lat input */}
          <div className="border-black border-x-5 border-y-4 bg-green-600  flex flex-row rounded-5 ">
            <label className="my-auto !text-[clamp(1rem,2vw,3rem)] mx-2">
              X:
            </label>
            <input
              placeholder="Latitude"
              name="Test"
              type="number"
              value={getLat}
              onChange={(e) => setGetLat(e.target.value)}
              className={`hover:cursor-pointer w-8/10 text-center
                 !text-[clamp(1rem,2vw,3rem)]
                 z-10 focus:outline-none
                 `}
            />
          </div>
          {/* long input */}

          <div
            className=" border-x-5 border-black bg-green-600 flex flex-row
               rounded-5 border-y-4"
          >
            <label className="my-auto !text-[clamp(1rem,2vw,3rem)] mx-2 ">
              Y:
            </label>
            <input
              placeholder="Longitude"
              type="number"
              value={getLong}
              onChange={(e) => setGetLong(e.target.value)}
              className={`hover:cursor-pointer w-8/10 text-center
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
             !text-[clamp(2rem,2vw,3rem)]
             rounded-5
             font-extrabold
             "
              onClick={() => {
                setRetMethod("coords");
                setFireup(!fireup);
              }}
            >
              Enter
            </button>
          </div>
        </motion.div>
      </div>
      {/* End of top of row  */}
      
    </div>
  );
}
