
import { React,useEffect } from "react";
import { MainTheme } from "../../helpers/themes/theme.js";
export function Home() {
  const theme = MainTheme();
  return (
    // Home Page Container
    <div className={`min-h-screen flex flex-col p-4 `}
      style = {{...theme.bg}}
    >

      <div className="bg-white min-h-full min-w-full flex items-center justify-center">
      <h1 className="text-[clamp(2rem, 5vw, 6rem)]">Project 3</h1>
    </div>



    </div>
  );
}