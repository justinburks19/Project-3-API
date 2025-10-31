import { forwardRef } from "react";

const SIZES = {
  small:  "text-[clamp(0.575rem,1vw,0.875rem)]",
  medium: "text-[clamp(0.575rem,1.2vw,1rem)]",
  large:  "text-[clamp(0.575rem,1.5vw,1.125rem)]",
  el:     "text-[clamp(0.575rem,1.75vw,1.25rem)]",
  dxl:    "text-[clamp(0.575rem,2vw,2rem)]",
  txl:    "text-[clamp(0.575rem,2.5vw,3rem)]",
};

const FONTS = {
  sans: "font-sans",
  serif: "font-serif",
  mono: "font-mono",
};




export const Button = forwardRef(function Button(
  {
    children,
    onClick,
    type = "button",
    size = "medium",
    font = "sans",
    className = "",
    bgColor = "",
    borderColor = "",
    borderSize = "",
    disabled = false,
    threed = false,
    elevated = false,
    pointers = "hover:cursor-pointer",


    ...props
  },
  ref
) {
  const classes = [
    SIZES[size],
    FONTS[font],
    className,
    bgColor,
    borderColor,
    borderSize,
    pointers,
    disabled ? "opacity-50 cursor-not-allowed" : "hover:cursor-pointer",
    threed ? "shadow-lg hover:shadow-xl border-b-4 active:shadow-md" : "",
    elevated ? "shadow" : "",
  ].filter(Boolean).join(" ");

  return (
    
    <button
      ref={ref}
      type={type}
      className={classes}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
});
