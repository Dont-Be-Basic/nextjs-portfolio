"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";

const Approach = () => {
  return (
    <section className="w-full py-20">
      <h1 className="heading">
        My <span className="text-purple"> approach</span>
      </h1>
      <div className="my-20 flex flex-col lg:flex-row items-center justify-center gap-4">
        <Card
          title="Discovery"
          icon={<AceternityIcon phaseNum="01." phase="Discovery" />}
          description="Where research and stakeholder input merge to form clear requirements that spark user stories and documentation."
        >
          <CanvasRevealEffect
            animationSpeed={5.1}
            containerClassName="bg-black-100"
          />
        </Card>
        <Card
          title="Exploration"
          icon={<AceternityIcon phaseNum="02." phase="Exploration" />}
          description="A dynamic phase where rapid prototyping, iterative wireframing, and collaborative sessions spark innovative design ideas."
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-black-100"
            colors={[
              [236, 72, 153],
              [232, 121, 249],
            ]}
            dotSize={2}
          />
        </Card>
        <Card
          title="Execution"
          icon={<AceternityIcon phaseNum="03." phase="Execution" />}
          description="Turning designs into reality through agile development, rigorous user testing, and continuous refinement."
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-black-100"
            colors={[[56, 189, 248]]}
          />
        </Card>

        <Card
          title="Implementation"
          icon={<AceternityIcon phaseNum="04." phase="Implementation" />}
          description="Bringing ideas to life by auditing builds, notifying stakeholders, updating release notes, deploying, and tracking success."
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-black-100"
            colors={[
              [167, 139, 250],
              [129, 140, 248],
            ]}
            dotSize={2}
          />
        </Card>
      </div>
    </section>
  );
};

const Card = ({
  title,
  icon,
  children,
  description,
}: {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  description: string;
}) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2] bg-gradient-to-t from-black-100 to-[#13162D] max-w-sm w-full mx-auto p-4 relative lg:h-[35rem] rounded-3xl"
    >
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20">
        <div className="text-start group-hover/canvas-card:-translate-y-4 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] group-hover/canvas-card:opacity-0 transition duration-200 w-full  mx-auto flex items-center justify-center">
          <div>{icon}</div>
        </div>
        <h2 className="text-center dark:text-white text-3xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4  font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200">
          {title}
        </h2>
        <div
          className="text-center dark:text-white opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4  font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200"
          style={{ color: "#E4ECFF" }}
        >
          {description}
        </div>
      </div>
    </div>
  );
};

const AceternityIcon = ({
  phaseNum,
  phase,
}: {
  phaseNum: string;
  phase: string;
}) => {
  return (
    <div>
      <h2 className="uppercase tracking-widest text-2xl font-bold text-center text-blue-100 max-w-80 leading-loose">
        <span className="text-5xl font-semibold">{phaseNum}</span>
        <br />
        {phase}
      </h2>
    </div>
  );
};

export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};

export default Approach;
