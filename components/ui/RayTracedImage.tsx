// components/ui/RayTracedImage.tsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface RayTracedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  containerClassName?: string;
  intensity?: number;
  priority?: boolean;
}

export default function RayTracedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className,
  containerClassName,
  intensity = 5,
  priority = false,
}: RayTracedImageProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // 3D tilt based on scroll position
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [intensity, 0, -intensity]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-intensity, 0, intensity]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  // Spring physics for smoothness
  const springConfig = { stiffness: 80, damping: 25 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);
  const springScale = useSpring(scale, springConfig);
  const springY = useSpring(y, springConfig);

  return (
    <div
      ref={ref}
      className={cn("ray-traced-container", containerClassName)}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="relative"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          scale: springScale,
          y: springY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Main Image */}
        {fill ? (
          <div className={cn("relative w-full h-full", className)}>
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain drop-shadow-2xl"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={priority}
            />
          </div>
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width || 600}
            height={height || 600}
            className={cn("object-contain drop-shadow-2xl", className)}
            priority={priority}
          />
        )}

        {/* Specular highlight overlay */}
        <div
          className="absolute inset-0 pointer-events-none rounded-lg"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(0,0,0,0.05) 100%)",
            mixBlendMode: "overlay",
          }}
        />

        {/* Inner shadow for depth */}
        <div
          className="absolute inset-0 pointer-events-none rounded-lg"
          style={{
            boxShadow: "inset 0 0 60px rgba(0,0,0,0.1)",
          }}
        />
      </motion.div>
    </div>
  );
}