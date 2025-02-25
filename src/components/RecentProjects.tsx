"use client";

import React from "react";
import { projects } from "@/data";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import Image from "next/image";

interface GridItemProps {
  title: string;
  description: string;
  img: string;
  iconLists: string[];
}

const GridItem = ({ title, description, img, iconLists }: GridItemProps) => {
  return (
    <li className="lg:min-h-[36.5rem] h-[27rem] list-none">
      <div className="relative h-full rounded-3xl border p-2 md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-2xl border-0.75 p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
          <div className="space-y-3">
            <div className="relative flex items-center justify-center sm:min-w-96 w-full overflow-hidden h-48 sm:min-h-[19rem] mb-10">
              <div
                className="relative w-full h-full overflow-hidden rounded-xl"
                style={{ backgroundColor: "#13162D" }}
              >
                <Image
                  src="/bg.png"
                  alt="bgimg"
                  fill
                  className="object-cover"
                />
              </div>
              <Image
                src={img}
                alt="cover"
                fill
                className="z-10 absolute bottom-0"
              />
            </div>
            <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
              {title}
            </h1>
            <p
              className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
              style={{
                color: "#BEC1DD",
                margin: "1vh 0",
              }}
            >
              {description}
            </p>
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center">
                {iconLists.map((icon, index) => (
                  <div
                    key={index}
                    className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                    style={{
                      transform: `translateX(-${5 * index + 2}px)`,
                    }}
                  >
                    <Image src={icon} alt="icon5" fill className="p-2" />
                  </div>
                ))}
              </div>

              <div className="flex justify-center items-center">
                <p className="flex lg:text-xl md:text-xs text-sm text-slate-400">
                  Details Coming Soon
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

const RecentProjects = () => {
  return (
    <div className="py-20" id="projects">
      <h1 className="heading">
        A small selection of{" "}
        <span className="text-purple">recent projects</span>
      </h1>
      <ul className="grid grid-cols-1 gap-4 lg:gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 mt-10 py-4">
        {projects.map(({ id, title, des, img, iconLists }) => (
          <GridItem
            key={id}
            title={title}
            description={des}
            img={img}
            iconLists={iconLists}
          />
        ))}
      </ul>
    </div>
  );
};

export default RecentProjects;
