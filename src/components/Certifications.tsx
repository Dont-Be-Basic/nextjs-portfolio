import { certs } from "@/data";
import React from "react";
import { CardSpotlight } from "./ui/card-spotlight";

const Certifications = () => {
  return (
    <div className="py-20 w-full">
      <h1 className="heading">
        Some of my <span className="text-purple"> certifications</span>
      </h1>
      <div className="w-full mt-12 grid md:grid-cols-2 grid-cols-1 gap-8">
        {certs.map((card) => (
          <CardSpotlight className="h-full w-full rounded-2xl" key={card.id}>
            <div className="flex lg:flex-row flex-col lg:items-center p-2 py-6 md:p-5 gap-2 z-20">
              <img
                src={card.thumbnail}
                alt={card.thumbnail}
                className="lg:w-32 md:w-20 w-16 z-20"
              />
              <div className="lg:ms-5 z-20">
                <h1 className="text-start text-xl md:text-2xl font-bold">
                  {card.title}
                </h1>
                <div className="flex gap-1 lg:gap-5 relative w-full mt-5">
                  <div className="flex flex-wrap items-center gap-3">
                    {card.skillsList.map((skill, index) => (
                      <span
                        key={index}
                        className="py-2 px-3 whitespace-nowrap text-xs rounded-3xl text-center border border-white-100/[0.5] text-white-100"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardSpotlight>
        ))}
      </div>
    </div>
  );
};

export default Certifications;
