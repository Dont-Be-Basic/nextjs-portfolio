"use client";

import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export const CardSpotlight = ({
  children,
  radius = 350,
  color = "#262626",
  pixelColors = ["#3B82F6", "#8B5CF6", "#EC4899"],
  gap = 5, // <-- Added gap prop here
  className,
  ...props
}: {
  radius?: number;
  color?: string;
  pixelColors?: string[];
  gap?: number;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const initializedRef = useRef(false);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  function handleMouseEnter() {
    setIsHovering(true);
    triggerPixelAnimation("appear");
  }

  function handleMouseLeave() {
    setIsHovering(false);
    triggerPixelAnimation("disappear");
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    ctx.scale(dpr, dpr);

    const pixels: Pixel[] = [];
    for (let x = 0; x < canvas.width; x += gap) {
      for (let y = 0; y < canvas.height; y += gap) {
        const color =
          pixelColors[Math.floor(Math.random() * pixelColors.length)];
        let delay = Math.random() * 100;
        pixels.push(new Pixel(canvas, ctx, x, y, color, 0.02, delay));
      }
    }

    pixelsRef.current = pixels;
    initializedRef.current = true;
  }, [pixelColors]);

  function triggerPixelAnimation(action: "appear" | "disappear") {
    if (!initializedRef.current) return;

    if (animationRef.current) cancelAnimationFrame(animationRef.current);

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx || !canvasRef.current) return;

      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      let allIdle = true;
      for (const pixel of pixelsRef.current) {
        pixel[action]();
        if (!pixel.isIdle) allIdle = false;
      }

      if (allIdle) {
        cancelAnimationFrame(animationRef.current!);
        animationRef.current = null;
      }
    };

    animate();
  }

  return (
    <div
      className={cn(
        "group/spotlight p-10 rounded-md relative border border-white/[0.1] bg-[#10132E]/[0.5] overflow-hidden",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute z-0 -inset-px rounded-2xl transition-opacity duration-300"
        style={{
          backgroundColor: color,
          maskImage: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              white,
              transparent 50%
            )
          `,
        }}
      />

      {/* Pixel Animation Layer */}
      <motion.canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{
          maskImage: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              white,
              transparent 100%
            )
          `,
        }}
      />

      {children}
    </div>
  );
};

// Pixel class for animation
class Pixel {
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  color: string;
  speed: number;
  size: number;
  sizeStep: number;
  minSize: number;
  maxSizeInteger: number;
  maxSize: number;
  delay: number;
  counter: number;
  counterStep: number;
  isIdle: boolean;
  isReverse: boolean;
  isShimmer: boolean;

  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    speed: number,
    delay: number
  ) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = speed;
    this.size = 0;
    this.sizeStep = Math.random() * 0.4;
    this.minSize = 0.5;
    this.maxSizeInteger = 2;
    this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
    this.delay = delay;
    this.counter = 0;
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
    this.isIdle = false;
    this.isReverse = false;
    this.isShimmer = false;
  }

  getRandomValue(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  appear() {
    this.isIdle = false;

    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }

    if (this.size >= this.maxSize) {
      this.isShimmer = true;
    }

    if (this.isShimmer) {
      this.shimmer();
    } else {
      this.size += this.sizeStep;
    }

    this.draw();
  }

  disappear() {
    this.isShimmer = false;
    this.counter = 0;

    if (this.size <= 0) {
      this.isIdle = true;
      return;
    } else {
      this.size -= 0.1;
    }

    this.draw();
  }

  shimmer() {
    if (this.size >= this.maxSize) {
      this.isReverse = true;
    } else if (this.size <= this.minSize) {
      this.isReverse = false;
    }

    if (this.isReverse) {
      this.size -= this.speed;
    } else {
      this.size += this.speed;
    }
  }
}
