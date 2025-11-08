import { UseTimeTheme } from "../../helpers/useTimeTheme.js";
import { SmokeEffects } from "../../toolbox/Effects/smokeEffects.jsx";
import { useControl } from "../../toolbox/controls/useControl.jsx";
import { HomeButtons } from "../homepage/homeButtons.jsx";
import { HomeTitle } from "../homepage/homeTitle.jsx";
//Lego play ;)
//clean and orginzed up!
export function Home() {
  const { show, hover, pageTracker,} = useControl();

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

  const bg = {
    Home: "bg-gradient-to-b from-black via-gray-800 to-black",
    Weather: "bg-gradient-to-b from-black via-green-800 to-black",
    Movie: "bg-gradient-to-b from-black via-blue-800 to-black",
    Crypto: "bg-gradient-to-b from-black via-purple-800 to-black",

  }

  const activeUnderline = hover ? hoverColor[hover] : pageColor[pageTracker];
  return (
    // Home Page Container
    <>

      <div className={'min-h-screen flex flex-col relative'}>
        {/* Outer Container */}
        <div className={`min-h-screen border-r-15 border-t-15 border-b-20 border-l-20 border-black relative bg-black !w-full`}>
          {/* Inner Container */}
          <div className={` border-2 absolute inset-0 shadow-lg rounded-5 ${activeUnderline} ${bg[pageTracker]} overflow-hidden`}>
            {!show && <SmokeEffects />}
            <HomeButtons />
          </div>
          <HomeTitle />
        </div>
      </div>
    </>

  );

}



