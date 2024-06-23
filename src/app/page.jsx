"use client";
import { useState } from 'react';
import Hotel from '../components/Hotel'; // Passe den Pfad an, falls notwendig
import berlinImage from '../imgs/berlin.jpg';
import singaporeImage from '../imgs/singapore.jpg';
import losAngelesImage from '../imgs/los-angeles.jpg';

export default function Home() {
  const [selected, setHotel] = useState(null);

  const handleHotelClick = (city) => {
    setHotel(selected === city ? null : city);
  };

  const cityClasses = {
    Singapore: 'justify-start',
    Berlin: 'justify-center',
    'Los Angeles': 'justify-end'
  };

  return (
    <div className={`
      flex h-[100vh] relative group/hotels
      ${cityClasses[selected] || ''}
    `}>
      <Hotel 
        city="Singapore" 
        imageSrc={singaporeImage} 
        selected={selected} 
        handleHotelClick={handleHotelClick}
        description="Entdecken Sie die Schönheit von Singapur im Marina Bay Sands Hotel, dem perfekten Ort für Ihren Urlaub.&nbsp;🌟🏖️🌊"
      />
      <Hotel 
        city="Berlin" 
        imageSrc={berlinImage} 
        selected={selected} 
        handleHotelClick={handleHotelClick} 
        description="Erleben Sie die Geschichte und Kultur von Berlin im Hotel Adlon Kempinski, dem perfekten Ort für Ihren Städtetrip.&nbsp;🌟🏰🌳"
      />
      <Hotel 
        city="Los Angeles" 
        imageSrc={losAngelesImage} 
        selected={selected} 
        handleHotelClick={handleHotelClick} 
        description="Erleben Sie Luxus und Stil im Herzen von Los Angeles im Hotel California, perfekt gelegen für Ihren Stadtaufenthalt.&nbsp;🌟🌴🏙️"
      />
    </div>
  );
}
