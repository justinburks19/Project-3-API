import { UseTimeTheme } from "../../helpers/useTimeTheme.js";
import { SmokeEffects } from "../../toolbox/Effects/smokeEffects.jsx";
import { useControl } from "../../toolbox/controls/useControl.jsx";
import { HomeButtons } from "../homepage/homeButtons.jsx";
import { HomeTitle } from "../homepage/homeTitle.jsx";
//Lego play ;)
//clean and orginzed up!
export function Home() {
  const { show, hover, pageTracker,} = useControl();

  const { bg = {} } = UseTimeTheme(); // Get time-based theme which returns bg and borderClass objects.


  return (
    // Home Page Container
    <>

      <div className={'min-h-dvh flex flex-col relative transform-gpu will-change-transform'}> {/* dvh for better mobile vh handling, tranform-gpu from the start! Should probably fix the others ;) */}
        {/* Outer Container */}
        <div className={`min-h-screen border-r-15 border-t-15 border-b-20 border-l-20 border-black relative bg-black !w-full`}>
          {/* Inner Container */}
          <div className={` border-5 
          ${pageTracker === "Weather Api" ? '!border-green-500 !brightness-125' :
              pageTracker === 'Movie Api' ? 'border-blue-500 !brightness-125' :
                pageTracker === 'Crypto Api' ? 'border-purple-500 !brightness-125' :
                  pageTracker === 'Home' ? 'border-orange-500 !brightness-125' : 'border-slate-700'} absolute inset-0 shadow-lg rounded-5 
            ${hover === 'Weather Api' ? '!border-green-600 ' :
              hover === 'Movie Api' ? '!border-blue-600' :
                hover === 'Crypto Api' ? '!border-purple-600' :
                  hover === 'Home' ? '!border-orange-600' : ''}`} style={{ ...bg, }}>
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



