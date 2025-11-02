import { forwardRef, useState, UseEffect,} from "react";

import {NavLink} from 'react-router-dom';
export const DropDown = forwardRef(function Dropdown(
  {
    label = "Dropdown",
    items = [],
    menueClass = "",
    onSelect, // Callback for selection
    //Main button props
    shadow = true,
    //Dropdown menue props
    menueRound = "rounded",
    menueBorderColor = "!border-black",
    menueBorder = "border",
    buttonClass = "",
    maxHeight = "max-h-60",
    //pointers
    pointer = "hover:cursor-pointer",
    listItemClass = "",
    ulClass = "",
  },
  ref
) {
  //current issue. Boot Strap sucks when it comes to Tailwindd. Need to manually hide menue on select.
  const [open, setOpen] = useState(null);
  

  return (
    // Toolbox Dropdown Button using Bootstrap 5
    <div className="dropdown" ref={ref}>
      {/* Dropdown Toggle Button */}
      <button
        className={` dropdown-toggle rounded p-1 border-b-1 
        ${shadow ? "shadow" : ""}  
        ${pointer}
        ${menueClass}
        `} // Bootstrap 5 class
        type="button" // ← BS5 data attribute
        data-bs-toggle="dropdown" // ← BS5 data attribute
        aria-expanded="false" // ← Accessibility attribute
        onClick={() => setOpen(!open)
          
        } // Toggle dropdown visibility
        
      >
        {label}
      </button>
      {/* Dropdown Menu Items */}
      {open && (
      <ul
        className={`dropdown-menu ${menueBorder} 
        ${menueRound} ${menueBorderColor} ${menueBorder}
        ${shadow ? "shadow-lg" : ""} 
        !hover:cursor-pointer
        ${maxHeight} 
        !w-[clamp(5rem,35vw,41rem)]


        left-5/10
        -translate-x-5/10
        overflow-y-auto
        !grid !grid-cols-1 
        sm:!grid-cols-2
        
        !border-b-7
        !border-l-5
        !border-t-3
        !border-r-3
        gap-1
        sm:gap-0
        ![--bs-dropdown-min-width:0]
        ${ulClass}
        `}
      >
        {items.length > 0 ? (
          items.map((item, index) => (
            <li key={index} className={`!hover:cursor-pointer !col-span-1
            text-[clamp(.8rem,2vw,1.5rem)] 
            ${listItemClass}


            `}>
              <a
                className={`dropdown-item  
                  ${buttonClass}
                  !text-center
                  `}
                href={item.href}
                // Handle selection for label update
                onClick={(e) => {
                  e.preventDefault();
                  onSelect?.(item.label);
                  setOpen(false); // Close dropdown on selection
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
      )}
    </div>
  );
});
