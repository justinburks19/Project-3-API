import { useMemo } from "react";
import { motion } from "framer-motion";

export function SmokeEffects({
  count = 80,               // number of smoke puffs
  colors = ["bg-red-700", "bg-yellow-700"],        // tailwind color for smoke
  blur = ["blur-[5px]", "blur-[10px]","blur-[15px]", "blur-[2px]"],          // tweak softness
  easeway = ["easeInOut", "easeIn", "easeOut", "linear"], //easing options
  upDown = ["(window.innerHeight * 1)", "(-window.innerHeight * 0.8)"], // different heights
}) {
  const seeds = useMemo(() => {  // useMemmo to avoid recalculating on every render
    // random number generator
    
    // lets have 2 different numbers! As a barrier to entry!
    const rnd = (min, max) => Math.random() * (max - min) + min;

    return Array.from({ length: count }, () => {
        const color = colors[Math.floor(Math.random() * colors.length)]; // pick random color from array
        const easeWay = easeway[Math.floor(Math.random() * easeway.length)]; // pick random easing from array
        const blurType = blur[Math.floor(Math.random() * blur.length)]; // pick random blur from array
        const upOrDownType = upDown[Math.floor(Math.random() * upDown.length)]; // pick random up or down direction

        const topOfContainer = window.innerHeight;
        const bottomOfContainer = 0;
      return {
      size: rnd(10, 30),               // size of the puff
      left: rnd(0, 100),               // left position in %
      delay: rnd(0, 20),                // how long to wait before starting
      duration: rnd(2, 20),            // duration of the puff
      drift: rnd(0, 10),             // going up and drifting right
      driftx: rnd(-100, 100),           // going up and drifting left
      color, // pick random color from array
      easeWay,
      blur : blurType,
      upOrDownType,
      };
    });
  }, [count, colors]); // depend only on count prop

  return (
    <div className="absolute inset-0 z-1 pointer-events-none  w-full mx-auto my-auto overflow-hidden">
      {seeds.map(({ size, left, delay, duration, color, easeWay, blur, upOrDownType }, i) => (
        <motion.span
          key={i} // each puff needs a unique key 1-counter
          className={`absolute ${color} ${blur} rounded-full transform-gpu will-change-transform ${blur} bottom-0`}
          style={{
            left: `${left}%`,
            width: size,
            height: size,
            bottom: 0,
          }}
          initial={{x: 0,  y: 0, opacity: 0, scale: 0.7 }}
          animate={{
            y: -eval(upOrDownType),           // float up up or down like dire
            x: 0, // drift right
            
            opacity: [0, 0.6, .8, 1, 0.4, 0],
            scale: [0.7, 1.2, 1.8, 1.1, 0.2, .1, 1, 3, 2.5, 1],
          }}
          transition={{
            duration,
            delay,
            ease: easeWay,
            repeat: Infinity,
            repeatDelay: 0.2,
          }}
        />
      ))}
    </div>
  );
}
