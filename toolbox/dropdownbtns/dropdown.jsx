import { forwardRef } from "react";

import {NavLink} from 'react-router-dom';
export const Dropdown = forwardRef(function Dropdown(
  {
    label = "Dropdown",
    items = [],
    fontColor = "!text-white",
    //Main button props
    btnColor = "bg-gray-700",
    dropBgColor = "!bg-gray-900",
    textSize = "!text-[clamp(0.85rem,1.5vw,2rem)]",
    border = "rounded-5",
    shadow = true,
    threeD = true,
    mainBorderColor = "!border-gray-300",
    //Dropdown menue props
    menueRound = "rounded",
    menueBorderColor = "!border-black",
    menueBorder = "border",
    //pointers
    pointer = "hover:cursor-pointer",
  },
  ref
) {
  return (
    // Toolbox Dropdown Button using Bootstrap 5
    <div className="dropdown" ref={ref}>
      {/* Dropdown Toggle Button */}
      <button
        className={`${btnColor} dropdown-toggle rounded p-1 border-b-1 ${mainBorderColor} 
        ${shadow ? "shadow" : ""} ${textSize} ${border} 
        ${threeD ? "!border-b-5" : ""} 
        ${pointer}
        ${fontColor}`} // Bootstrap 5 class
        type="button" // ← BS5 data attribute
        data-bs-toggle="dropdown" // ← BS5 data attribute
        aria-expanded="false" // ← Accessibility attribute
      >
        {label}
      </button>
      {/* Dropdown Menu Items */}
      <ul
        className={`dropdown-menu p-1 ${menueBorder} ${dropBgColor} ${textSize} 
        ${menueRound} ${menueBorderColor} ${menueBorder} 
        ${shadow ? "shadow-lg" : ""} 
        ${threeD ? "!border-b-5" : ""}`}
      >
        {items.length > 0 ? (
          items.map((item, index) => (
            <li key={index}>
              <a
                className={`dropdown-item !hover:cursor-pointer !border-b-2 !p-1 !mt-1 
                  
                  ${fontColor}
                  ${textSize}
                  active:background-transparent
                  `}
                href={item.href}
                style={{
                  color: "inherit",
                  WebkitTapHighlightColor: "transparent",
                  // neutralize Bootstrap dropdown backgrounds
                  "--bs-dropdown-link-hover-bg": "transparent",
                  "--bs-dropdown-link-active-bg": "transparent",
                  // (optional) also neutralize general link colors
                  "--bs-link-color": "inherit",
                  "--bs-link-hover-color": "inherit",
                  "--bs-dropdown-link-color": "inherit",
                  "--bs-dropdown-link-hover-color": "inherit",
                  "--bs-dropdown-link-active-color": "inherit",
                }}
              >
                {item.label}
              </a>
            </li>
          ))
        ) : (
          <li>
            <span className="dropdown-item-text">No items available</span>
          </li>
        )}
      </ul>
    </div>
  );
});
