import { UseTimeTheme } from "../../helpers/useTimeTheme.js";
import { SmokeEffects } from "../../toolbox/Effects/smokeEffects.jsx";
import { useControl } from "../../toolbox/controls/useControl.jsx";
import { HomeButtons } from "../homepage/homeButtons.jsx";
import { HomeTitle } from "../homepage/homeTitle.jsx";
//Lego play ;)
//clean and orginzed up!
export function Home() {
  const { show} = useControl();

  const { bg = {}} = UseTimeTheme(); // Get time-based theme which returns bg and borderClass objects.


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
        <HomeButtons />
      </div>
      <HomeTitle />
    </div>
    </div>
    </>

  );

}



