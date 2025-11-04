import { useMemo } from "react";
import { motion } from "framer-motion";

export function SmokeEffects({
  count = 80,               // number of smoke puffs
  colors = ["bg-red-700", "bg-yellow-700"],        // tailwind color for smoke
  blur = ["blur-[5px]", "blur-[10px]","blur-[15px]", "blur-[2px]"],          // tweak softness
  easeway = ["easeInOut", "easeIn", "easeOut", "linear"], //easing options
}) {
  const seeds = useMemo(() => {  // useMemmo to avoid recalculating on every render
    // random number generator
    
    // lets have 2 different numbers! As a barrier to entry!
    const rnd = (min, max) => Math.random() * (max - min) + min;

    return Array.from({ length: count }, () => {
        const color = colors[Math.floor(Math.random() * colors.length)]; // pick random color from array
        const easeWay = easeway[Math.floor(Math.random() * easeway.length)]; // pick random easing from array
        const blurType = blur[Math.floor(Math.random() * blur.length)]; // pick random blur from array
      return {
      size: rnd(10, 30),               // size of the puff
      left: rnd(0, 100),               // left position in %
      delay: rnd(0, 20),                // how long to wait before starting
      duration: rnd(2, 20),            // duration of the puff
      drift: rnd(0, 10),             // going up and drifting right
      driftx: rnd(35, 75),           // going up and drifting left
      color, // pick random color from array
      easeWay,
      blur : blurType,
      };
    });
  }, [count, colors]); // depend only on count prop

  return (
    <div className="absolute inset-0 z-1 pointer-events-none  w-full h-full">
      {seeds.map(({ size, left, delay, duration, color, easeWay, blur }, i) => (
        <motion.span
          key={i} // each puff needs a unique key 1-counter
          className={`absolute ${color} ${blur} rounded-full transform-gpu will-change-transform ${blur} bottom-0`}
          style={{
            left: `${left}%`,
            width: size,
            height: size,
          }}
          initial={{x: '0%',  y: '50%', opacity: 0, scale: 0.7 }}
          animate={{
            x: [0, -20, -40, -60, -80, -100],  // float left or right
            y: '-100vh',           // float up up or down like fire
            
            opacity: [0, 0.6, .8, 1, 0.4, 0],
            scale: [0.7, 1.2, 1.8, 1.1, 0.2, .1, 1, 3, 2.5, 1],
          }}
          transition={{
            duration,
            delay,
            ease: easeWay,
            repeat: Infinity,
            repeatType: "mirror", // alternate direction on each repeat. Be like fire :)
          }}
        />
      ))}
    </div>
  );
}
