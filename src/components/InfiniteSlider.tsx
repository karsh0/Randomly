import { sampleUsers } from "@/lib/sample";
import { motion, animate, useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";
import { SliderCard } from "./SliderCard";

export function InfiniteSlider({data, distance}:{data: any[],distance: number}) {
  const x = useMotionValue(0);
  const animationRef = useRef<ReturnType<typeof animate> | null>(null);

  const startAnimation = () => {
    animationRef.current = animate(x, distance, {
      type: "tween",
      ease: "linear",
      duration: 300, 
      onUpdate: () => {},
      repeat: Infinity,
      repeatType: "loop",
    });
  };

  const stopAnimation = () => {
    animationRef.current?.stop();
  };

  useEffect(() => {
    startAnimation();
    return stopAnimation;
  }, []);

  return (
    <div className="overflow-hidden w-full">
      <motion.div
        className="flex gap-6 px-6"
        style={{ x }}
        onMouseEnter={stopAnimation}
        onMouseLeave={startAnimation}
      >
        {[...data, ...data].map((user, i) => (
          <SliderCard key={i} {...user} />
        ))}
      </motion.div>
    </div>
  );
}
