// hooks/useSpringPhysics.ts
// Apple Spring Physics Constants

import { useSpring, useTransform, MotionValue } from "framer-motion";

// Apple Constants - DO NOT MODIFY
export const SPRING_STANDARD = { 
  stiffness: 120, 
  damping: 20, 
  mass: 1,
  restDelta: 0.01,
  restSpeed: 0.01,
};

export const SPRING_PRO = { 
  stiffness: 80, 
  damping: 25, 
  mass: 1,
  restDelta: 0.01,
  restSpeed: 0.01,
};

export const SPRING_GENTLE = { 
  stiffness: 100, 
  damping: 30, 
  mass: 1,
  restDelta: 0.01,
  restSpeed: 0.01,
};

export const SPRING_BOUNCE = { 
  stiffness: 300, 
  damping: 10, 
  mass: 1,
  restDelta: 0.01,
  restSpeed: 0.01,
};

type SpringType = "standard" | "pro" | "gentle" | "bounce";

export function useSpringPhysics(
  value: MotionValue<number>,
  type: SpringType = "standard"
) {
  const configs = {
    standard: SPRING_STANDARD,
    pro: SPRING_PRO,
    gentle: SPRING_GENTLE,
    bounce: SPRING_BOUNCE,
  };

  return useSpring(value, configs[type]);
}

// 3D Tilt effect for Ray-Traced images
export function use3DTilt(
  scrollYProgress: MotionValue<number>,
  intensity: number = 5
) {
  const rotateX = useTransform(
    scrollYProgress, 
    [0, 1], 
    [intensity, -intensity]
  );
  const rotateY = useTransform(
    scrollYProgress, 
    [0, 1], 
    [-intensity, intensity]
  );
  
  return {
    rotateX: useSpringPhysics(rotateX, "pro"),
    rotateY: useSpringPhysics(rotateY, "pro"),
  };
}

// Hover tilt effect
export function useHoverTilt() {
  return {
    whileHover: { 
      scale: 1.02,
      transition: SPRING_STANDARD,
    },
    whileTap: { 
      scale: 0.98,
      transition: SPRING_STANDARD,
    },
  };
}

// Page transition
export function usePageTransition() {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        ...SPRING_GENTLE,
        staggerChildren: 0.05,
      },
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.3,
      },
    },
  };
}

export default useSpringPhysics;