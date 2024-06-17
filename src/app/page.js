"use client";
import { useState } from "react";
import Image from "next/image";
import berlinImage from '../imgs/berlin.jpg';
import singaporeImage from '../imgs/singapore.jpg';
import losAngelesImage from '../imgs/los-angeles.jpg';

export default function Home() {
  const [selected, setHotel] = useState(null);

  const handleHotelClick = (city) => {
    setHotel(selected === city ? null : city);
  };

  return (
    <div className="flex h-[100vh] relative group/hotels">

      {/* Singapore */}
      <div 
        onClick={() => handleHotelClick('singapore')} 
        className={`
          group/sg relative flex place-content-center transition-all duration-500 
          ${selected === 'singapore' ? 'w-full' : 'cursor-pointer w-1/3 group-hover/hotels:w-1/4 group-hover/hotels:hover:w-1/2'} 
          ${selected && selected !== 'singapore' ? 'hidden' : ''}
        `}
      >
        <h2 className="z-10 text-5xl absolute font-bold bottom-[10vh] text-yellow-400 text-stroke-3 transition-all duration-500 group-hover/hotels:opacity-0 group-hover/sg:!opacity-100 ">Singapore</h2>
        <div className="z-[5] absolute group-hover/hotels:!backdrop-blur-md group-hover/sg:!backdrop-blur-none h-full w-full"></div>
        <Image
          className="h-[100vh] w-full object-cover object-[25%] transition-all duration-500  "
          src={singaporeImage}
          width={500}
          height={500}
          alt="Singapore"
        />
      </div>

      {/* Berlin */}
      <div 
        onClick={() => handleHotelClick('berlin')}
        className={`
          group/b relative flex place-content-center transition-all duration-500 
          ${selected === 'berlin' ? 'w-full' : 'cursor-pointer w-1/3 group-hover/hotels:w-1/4 group-hover/hotels:hover:w-1/2'} 
          ${selected && selected !== 'berlin' ? 'hidden' : ''}
        `}
      >
        <h2 className="z-10 text-5xl absolute font-bold bottom-[10vh] text-orange-400 text-stroke-3 transition-all duration-500 group-hover/hotels:opacity-0 group-hover/b:!opacity-100">Berlin</h2>
        <div className={`
          z-[5] absolute group-hover/hotels:backdrop-blur-md group-hover/b:!backdrop-blur-none h-full w-full
          ${selected === 'berlin' ? '!backdrop-blur-md group-hover/b:!backdrop-blur-md' : ''}
        `}></div>
        <Image
          className={`
            h-[100vh] w-full object-cover object-[70%] transition-all duration-500
          `}
          src={berlinImage}
          width={500}
          height={500}
          alt="Berlin"
        />
      </div>

      {/* Los Angeles */}
      <div 
        onClick={() => handleHotelClick('los-angeles')}
        className={`
          group/la relative flex place-content-center transition-all duration-500 
          ${selected === 'los-angeles' ? 'w-full' : 'cursor-pointer w-1/3 group-hover/hotels:w-1/4 group-hover/hotels:hover:w-1/2'} 
          ${selected && selected !== 'los-angeles' ? 'hidden' : ''}
        `}
      >
        <h2 className="z-10 text-5xl absolute font-bold bottom-[10vh] text-blue-400 text-stroke-3 transition-all duration-500 group-hover/hotels:opacity-0 group-hover/la:!opacity-100 ">Los Angeles</h2>
        <div className="z-[5] absolute group-hover/hotels:!backdrop-blur-md group-hover/la:!backdrop-blur-none h-full w-full"></div>
        <Image
          className="h-[100vh] w-full object-cover object-[35%] transition-all duration-500 "
          src={losAngelesImage}
          width={500}
          height={500}
          alt="Los Angeles"
        />
      </div>

    </div>
  );
}
