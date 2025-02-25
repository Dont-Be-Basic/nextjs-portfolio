"use client";

import React, { useEffect, useRef } from "react";

interface PixelCanvasProps {
  gap?: number;
  speed?: number;
  colors?: string[];
  variant?: "default" | "icon";
  noFocus?: boolean;
  className?: string;
}

const PixelCanvas: React.FC<PixelCanvasProps> = ({
  gap = 5,
  speed = 35,
  colors = ["#f8fafc", "#f1f5f9", "#cbd5e1"],
  variant = "default",
  noFocus = false,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const initializedRef = useRef(false);

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
        const color = colors[Math.floor(Math.random() * colors.length)];
        let delay = 0;

        if (variant === "icon") {
          delay = getDistanceToCenter(x, y, canvas.width, canvas.height);
        } else {
          delay = getDistanceToBottomLeft(x, y, canvas.height);
        }

        pixels.push(new Pixel(canvas, ctx, x, y, color, speed * 0.001, delay));
      }
    }

    pixelsRef.current = pixels;
    initializedRef.current = true;
  }, [gap, speed, colors, variant]);

  const handleAnimation = (action: "appear" | "disappear") => {
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
  };

  return (
    <div
      className={`relative w-full h-full ${className}`}
      onMouseEnter={() => handleAnimation("appear")}
      onMouseLeave={() => handleAnimation("disappear")}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
};

export { PixelCanvas };

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
    this.speed = this.getRandomValue(0.1, 0.9) * speed;
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
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(
      this.x + centerOffset,
      this.y + centerOffset,
      this.size,
      this.size
    );
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

const getDistanceToCenter = (
  x: number,
  y: number,
  width: number,
  height: number
) => {
  const dx = x - width / 2;
  const dy = y - height / 2;
  return Math.sqrt(dx * dx + dy * dy);
};

const getDistanceToBottomLeft = (x: number, y: number, height: number) => {
  const dx = x;
  const dy = height - y;
  return Math.sqrt(dx * dx + dy * dy);
};
