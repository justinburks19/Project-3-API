import { DropDown } from "../../toolbox/dropdownbtns/dropdown.jsx";
import { GetStates, GetPositions } from "../../helpers/states.js";
import { motion } from "framer-motion"
import { useControl } from "../../toolbox/controls/useControl.jsx";
import { ThreeDText } from "../../toolbox/Effects/threeDText.jsx";
import { SmokeEffects } from "../../toolbox/Effects/smokeEffects.jsx"
import { BottomPage } from "../weatherpage/bottomPage.jsx";
import { TopPage } from "../weatherpage/topPage.jsx";
export function Weather() {
  return (
    //start of main container
    <div className=" border-t-3 !border-black flex flex-col"> {/* creates two column grid */}

      {/* Top of row */}
      
      
        <TopPage />
      
      
      {/* Bottom of row */}
      <BottomPage />
      <p>Test2</p>
      {/* End of main container  */}
    </div>
  );
}
