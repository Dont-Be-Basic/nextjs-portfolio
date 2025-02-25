import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { companies, testimonials } from "@/data";
import Image from "next/image";

const Clients = () => {
  return (
    <div id="testimonials" className="py-20">
      <h1 className="heading">
        Kind words from my <span className="text-purple">recommendations</span>
      </h1>
      <div className="flex flex-col items-center mt-10">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
        />

        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-16 max-lg: mt-10">
          {companies.map(({ id, img, name, nameImg }) => (
            <div
              key={id}
              className="flex items-center md:max-w-60 max-w-32 gap-3"
            >
              <Image
                src={img}
                alt={name}
                width={40}
                height={40}
                className="md:w-10 md:h-10 w-5 h-5"
              />
              <Image
                src={nameImg}
                alt={name}
                width={96}
                height={96}
                className="md:w-24 md:h-24 h-20 w-20"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clients;
