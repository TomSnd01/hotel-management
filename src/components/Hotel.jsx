import Image from 'next/image';
import { useEffect, useState } from 'react';
import Dialog from './Dialog';

const Hotel = ({ city, imageSrc, selected, handleHotelClick, description }) => {
  const [dialogPage, setDialogPage] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState('');

  const cityClasses = {
    Singapore: {
      color: 'text-yellow-400',
      bgcolor: 'bg-yellow-400',
      bgcolorLight: 'bg-yellow-200',
      group: 'group/singapore',
      backdropBlurNone: 'group-hover/singapore:!backdrop-blur-none',
      hoverOpacity: 'group-hover/singapore:!opacity-100',
      borderHover: 'border-yellow-400 hover:border-yellow-400'
    },
    Berlin: {
      color: 'text-orange-400',
      bgcolor: 'bg-orange-400',
      bgcolorLight: 'bg-orange-200',
      group: 'group/berlin',
      backdropBlurNone: 'group-hover/berlin:!backdrop-blur-none',
      hoverOpacity: 'group-hover/berlin:!opacity-100',
      borderHover: 'border-orange-400 hover:border-orange-400'
    },
    'Los Angeles': {
      color: 'text-blue-400',
      bgcolor: 'bg-blue-400',
      bgcolorLight: 'bg-blue-200',
      group: 'group/losangeles',
      backdropBlurNone: 'group-hover/losangeles:!backdrop-blur-none',
      hoverOpacity: 'group-hover/losangeles:!opacity-100',
      borderHover: 'border-blue-400 hover:border-blue-400'
    },
  };

  const getClass = (city, type) => {
    return cityClasses[city] ? cityClasses[city][type] : '';
  };

  useEffect(() => {
    if (selected !== city) {
      setDialogPage(0);
      setSelectedRoom('');
    }
  }, [selected, city]);

  return (
    <>
      <div 
        className={`
          ${getClass(city, 'group')}
          relative flex place-content-center transition-all duration-500 
          ${selected === city ? 'w-full' : 'cursor-pointer w-1/3 group-hover/hotels:w-1/4 group-hover/hotels:hover:w-1/2'} 
          ${selected && selected !== city ? 'hidden' : ''}
        `}
      >
        <h2
          onClick={() => handleHotelClick(city)}
          className={`
            z-20 uppercase text-center text-[calc(1.0625rem+2.2604vw)] leading-snug absolute font-bold bottom-[10vh] 
            text-stroke-3 transition-all duration-500 group-hover/hotels:opacity-0
            ${getClass(city, 'color')}
            ${getClass(city, 'hoverOpacity')}
        `}
        >
          <div className={`${selected === city ? 'hidden' : ''}`}>
            {city}
          </div>
        </h2>

        <Dialog 
          city={city} 
          description={description} 
          getClass={getClass} 
          selected={selected}
          setDialogPage={setDialogPage}
          dialogPage={dialogPage}
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
        />

        {/* Image-Blur */}
        <div
          onClick={() => handleHotelClick(city)}
          className={`
            z-[5] absolute
            group-hover/hotels:backdrop-blur-md 
            ${getClass(city, 'backdropBlurNone')}
            h-full w-full 
        `}></div>

        {/* Image */}
        <Image
          className={`
            h-[100vh] -z-10 w-full object-cover object-[25%] transition-all duration-500
            ${selected === city ? 'blur-md' : 'blur-none'}
          `}
          src={imageSrc}
          width={500}
          height={500}
          alt={city}
        />
      </div>
    </>
  )
};

export default Hotel;
