import { start } from "@popperjs/core";
import {motion} from "framer-motion";
export function ThreeDText({
    //props
    title, 
    color = "!text-green-500", 
    startEnd = false,
    begin = "",
    end = "",
    font = "bungee-regular",
    className = "",
    threeDAlignment = "top-[clamp(0.1rem,.8vw,1rem)] right-[clamp(0.3rem,.6vw,1rem)]",
    delay = 0,
    }){
    //create a array to extract emojis if present
  return (
  //give a relative spacing container
  <>
  <div className="relative overflow-hidden">
  
<h1 className={` ${font} ${color} justify-center  ${className}`}>
    {/* Animated Title */}
        <motion.span 
        initial = {{ x: 0, opacity: 0, }}
        animate = {{ x: 0, opacity: 1 }}
        transition = {{ delay: delay, duration: 3, ease: "easeInOut" }}
        >
          {startEnd ? <motion.span 
          className="inline-block" // Ensures the span is treated as a block for rotation
            initial={{rotate: 0,}}
            animate={{rotate: [-20, 20] }}
            transition={{
                rotate:{duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "mirror", },
            }}
          >{begin}</motion.span> : null}
          {title}
          {startEnd ? <motion.span className="inline-block" // Ensures the span is treated as a block for rotation
            initial={{rotate: 0, delay: delay }}
            animate={{rotate: [-20, 20] }}
            transition={{
                rotate:{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "mirror", },
            }}>{end}</motion.span> : null}
        </motion.span>
    {/* Slide in title */}
        <div>
        <motion.span className={`absolute ${threeDAlignment} w-full h-full pointer-events-none transform-gpu`}
        initial = {{ x:'-100%' , opacity: 0, delay: delay }}
        animate = {{ x: 0, opacity: .20 }}
        transition = {{duration: 2, ease: "easeInOut" }}
        >

          {startEnd ? 
          <motion.span
            className="inline-block" // Ensures the span is treated as a block for rotation
            initial={{rotate: 0, opacity: .20, delay: delay }}
            animate={{rotate: [20, -20], opacity: 1}}
            transition={{
                rotate:{duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "mirror", },
                opacity: { duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "mirror", },
            }}
          >{begin}</motion.span> : null}

          {title}

          {startEnd ? 
          <motion.span className="inline-block" // Ensures the span is treated as a block for rotation
            initial={{rotate: 0, delay: delay }}
            animate={{rotate: [20, -20] }}
            transition={{
                rotate:{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "mirror", },
            }}>{end}</motion.span> : null}
        </motion.span>
        </div>
      </h1>
      </div>
    
    
    
    
    </>
    );
    
}