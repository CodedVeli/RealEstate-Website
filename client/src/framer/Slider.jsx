import  { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import img1 from '../assets/img1.jpg'
import img2 from '../assets/img2.jpg'
import img3 from '../assets/img3.jpg'
import img4 from '../assets/img4.jpg'

const imgs = [
    img1,
  img2,
  img3,
  img4
];



const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND *5;
const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 150,
  damping: 50,
};

export const SwipeCarousel = () => {
  const [imgIndex, setImgIndex] = useState(0);


  const dragX = useMotionValue(0);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragX.get();


      if (x === 0) {
        setImgIndex((pv) => {
          if (pv === imgs.length - 1) {
            return 0;
          }
          return pv + 1;
        });
      }
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  }, []);

  const onDragEnd = () => {
    const x = dragX.get();

 
    if (x <= -DRAG_BUFFER && imgIndex < imgs.length - 1) {
      setImgIndex((pv) => pv + 1);
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex((pv) => pv - 1);
    }
  };

  return (
    <div className="relative overflow-hidden py-8">
      <motion.div
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        style={{
          x: dragX,
        }}
        animate={{
          translateX: `-${imgIndex * 100}%`,
        }}
        transition={SPRING_OPTIONS}
        onDragEnd={onDragEnd}
        className="flex cursor-grab items-center active:cursor-grabbing"
      >    
      
        <Images imgIndex={imgIndex} />
      
        
      </motion.div>
      

      <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} />
      
    </div>
  );
};



 const Images = ({ imgIndex }) => {

  return (
    <>
      {imgs.map((imgSrc, idx) => {
        return (
          <motion.div
            key={idx}
            style={{
              backgroundImage: `url(${imgSrc})`,
              backgroundSize: "cover",
              backgroundPosition: "center",              
            }}
            animate={{
              scale: imgIndex === idx ? 1 : 1,
            }}
            transition={SPRING_OPTIONS}
            className="aspect-video w-[100%] shrink-0 rounded-xl  object-cover"
          >
                 
            <motion.h1 initial={{ opacity:0}}  animate={{opacity:1}} transition={{ delay: 1.5 , duration:1.5}} className=" pt-[1200px] text-center text-6xl font-medium text-red-700">Find your dream home</motion.h1>
           
          
           
          </motion.div>
        );
      })}
    </>
  );
};

const Dots = ({ imgIndex, setImgIndex }) => {
  return (
    <div className="mt-4 flex w-full justify-center gap-2">
      {imgs.map((_, idx) => {
        return (
          <button
            key={idx}
            onClick={() => setImgIndex(idx)}
            className={`h-3 w-3 rounded-full transition-colors ${
              idx === imgIndex ? "bg-red-500" : "bg-neutral-500"
            }`}
          />
        );
      })}
    </div>
  );
};

// const GradientEdges = () => {
//   return (
//     <>
//     {/* bg-gradient-to-r from-slate-500/50 to-neutral-950/0 */}
//       <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[10vw] max-w-[100px]  bg-gradient-to-r from-white to-neutral-50 " />
//       <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-l from-slate-600/20 to-neutral-950/0 " />
//     </>
//   );
// };


export default SwipeCarousel;