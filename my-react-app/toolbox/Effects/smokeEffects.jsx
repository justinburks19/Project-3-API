import { useMemo } from "react";
import { motion } from "framer-motion";

export function SmokeEffects({
  count = 80,               // number of smoke puffs
  colors = ["bg-red-700", "bg-yellow-700"],        // tailwind color for smoke
  blur = ["blur-[5px]", "blur-[6px]","blur-[2px]", "blur-[0px]"],          // tweak softness
  easeway = ["easeInOut", "easeIn", "easeOut"], //easing options
  upOrDown = ["linear", "mirror"], // not used yet
  //control for text 
  text = false,              // optional text inside smoke puff
  myText = "💨",          // text to show if text is true
}) 
  {

  const seeds = useMemo(() => {  // useMemmo to avoid recalculating on every render
    // lets have 2 different numbers! As a barrier to entry!
    const rnd = (min, max) => Math.random() * (max - min) + min;


    return Array.from({ length: count }, () => {
        const color = colors[Math.floor(Math.random() * colors.length)]; // pick random color from array
        const easeWay = easeway[Math.floor(Math.random() * easeway.length)]; // pick random easing from array
        const blurType = blur[Math.floor(Math.random() * blur.length)]; // pick random blur from array
        const upOrDownType = upOrDown[Math.floor(Math.random() * upOrDown.length)]; // pick random up or down from array
        const top = rnd(0,100);
      if (!text) {  return {
      size: rnd(10, 20),               // size of the puff
      left: rnd(0, 100),               // left position in %
      delay: rnd(0, 20),                // how long to wait before starting
      duration: rnd(2, 30),            // duration of the puff
      drift: rnd(0, 10),             // going up and drifting right
      driftx: rnd(35, 75),           // going up and drifting left
      color, // pick random color from array
      easeWay,
      blur : blurType,
      text,
      upOrDownType,
      }; } 
        else { return {
        text: myText,
        left: rnd(0, 100),               // left position in %
        delay: rnd(0, 3),                // how long to wait before starting
        duration: rnd(2, 15),            // duration of the puff
        easeWay,
        size: rnd(1,5),               // size of the puff
        top

      }; } 

    });
  }, [count, text, myText]); // depend only on count prop

  return (
    <>
    
      {!text ? (
      <div className="absolute z-1 pointer-events-none  w-full h-full rounded-5 overflow-hidden">
      <div>
      {seeds.map(({ size, left, delay, duration, color, easeWay, blur, upOrDownType }, i) => (
        
        <motion.span
          key={i} // each puff needs a unique key 1-counter
          className={`absolute ${color} ${blur} rounded-full ${blur} bottom-0 right-100 left-0 w-full h-full justify-center align-middle transform-gpu will-change-transform pointer-events-none opacity-50 `}
          style={{
            left: `${left}%`,
            width: size,
            height: size,
          }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{
            x: [0,100],  // float left or right
            y: ['0vh', '-93vh'],           // float up up or down like fire
            
            opacity: [0.1,1],
            scale: [.3,2],
          }}
          transition={{
            duration,
            delay,
            ease: easeWay,
            repeat: Infinity,
            repeatType: upOrDownType, // alternate direction on each repeat. Be like fire :)
          }}
        />
        
      ))}
      </div>
    </div>
      ) : (
      <div className="relative z-1 pointer-events-none w-full min-h-[105%] rounded-5 mx-auto"> 
      
      <motion.span>
      {seeds.map(({ 
        text, 
        left,                                               
        duration,
        size}, i) => (
        <motion.span
          key={i} 
          className={`absolute text-${size} pointer-events-none transform-gpu will-change-transform opacity-1 brightness-300
            0 `}
          style={{
            left: `${left}%`,
          }}
          initial={{ y: `${left}%` }}
          animate={{
            top: "100%", //goes all the way down
            //x: ['-5vh','5vw'], // can drive left to right, to left to stitmulate wind looks like like snow lol ;)
            opacity: [.8,1],
            brightness: [100,200]
          }}
          transition={{
            duration,
            repeat: Infinity,
            repeatType: "linear",
            
          }}
        >
          {text}
        </motion.span>
      ))}
      </motion.span>
    </div>
    
      )}

    
    </>
  );
}
