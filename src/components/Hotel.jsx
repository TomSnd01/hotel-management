import Image from 'next/image';

const Hotel = ({ city, imageSrc, selected, handleHotelClick }) => {

  const cityClasses = {
    Singapore: {
      color: 'text-yellow-400',
      group: 'group/singapore',
      backdropBlurNone: 'group-hover/singapore:!backdrop-blur-none',
      hoverOpacity: 'group-hover/singapore:!opacity-100',
    },
    Berlin: {
      color: 'text-orange-400',
      group: 'group/berlin',
      backdropBlurNone: 'group-hover/berlin:!backdrop-blur-none',
      hoverOpacity: 'group-hover/berlin:!opacity-100',
    },
    'Los Angeles': {
      color: 'text-blue-400',
      group: 'group/losangeles',
      backdropBlurNone: 'group-hover/losangeles:!backdrop-blur-none',
      hoverOpacity: 'group-hover/losangeles:!opacity-100',
    },
  };

  const getClass = (city, type) => {
    return cityClasses[city] ? cityClasses[city][type] : '';
  };

  return (
    <>
      <div 
        onClick={() => handleHotelClick(city)}
        className={`
          ${getClass(city, 'group')}
          relative flex place-content-center transition-all duration-500 
          ${selected === city ? 'w-full' : 'cursor-pointer w-1/3 group-hover/hotels:w-1/4 group-hover/hotels:hover:w-1/2'} 
          ${selected && selected !== city ? 'hidden' : ''}
        `}
      >
        <h2 className={`
          z-20 capitalize text-center text-[calc(1.0625rem+2.2604vw)] leading-snug absolute font-bold bottom-[10vh] 
          text-stroke-3 transition-all duration-500 group-hover/hotels:opacity-0
          ${getClass(city, 'color')}
          ${getClass(city, 'hoverOpacity')}
        `}
        >
          {/* {city.split(' ').map((word, index) => (
            <span key={index}>{word}{index < city.split(' ').length - 1 && <br />}</span>
          ))} */}
          {city}
        </h2>

        <div className={`
          z-[5] absolute
          group-hover/hotels:backdrop-blur-md 
          ${getClass(city, 'backdropBlurNone')}
          h-full w-full 
        `}></div>

        <Image
          className="h-[100vh] w-full object-cover object-[25%] transition-all duration-500"
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
