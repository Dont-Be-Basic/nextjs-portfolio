"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface BlobProps extends React.HTMLAttributes<HTMLDivElement> {
  firstBlobColor?: string;
  secondBlobColor?: string;
}

export const BlurryBlobs = ({
  className,
  firstBlobColor = "bg-blue-400",
  secondBlobColor = "bg-purple-400",
}: BlobProps = {}) => {
  return (
    <motion.div
      initial={{
        opacity: 0.8,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="min-h-52 min-w-52"
    >
      <div className="relative w-full">
        {/* First Blob */}
        <motion.div
          initial={{ scale: 1, x: 0, y: 0 }}
          animate={{
            scale: [1, 1.5, 0.9, 1.2], // Scaling effect
            x: [-10, 20, -15, 0], // Subtle movement
            y: [-10, 15, -20, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className={cn(
            "absolute -right-60 -top-28 h-96 w-96 rounded-sm p-8 opacity-45 mix-blend-multiply blur-3xl filter",
            className,
            firstBlobColor
          )}
        ></motion.div>

        {/* Second Blob */}
        <motion.div
          initial={{ scale: 1, x: 0, y: 0 }}
          animate={{
            scale: [1, 1.3, 0.9, 1], // Different scale effect
            x: [10, -15, 20, 0], // Opposite movement
            y: [10, -20, 15, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className={cn(
            "absolute -left-60 -top-48 h-96 w-96 rounded-sm p-8 opacity-45 mix-blend-multiply blur-3xl filter",
            className,
            secondBlobColor
          )}
        ></motion.div>
      </div>
    </motion.div>
  );
};
