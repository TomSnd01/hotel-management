"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import berlinImage from '../../../imgs/los-angeles.jpg';

export default function Rooms() {
  const [bookings, setBookings] = useState([]);
  const [hotelName, setHotelName] = useState('Berlin');
  const [checkIn, setCheckIn] = useState('2024-02-01');
  const [checkOut, setCheckOut] = useState('2024-12-31');

  const amenityEmojis = {
    "Meerblick": "🌊",
    "Balkon": "🌇",
    "Wi-Fi": "📶",
    "Badewanne": "🛁"
  };

  const roomTypeEmojis = {
    "Einzelzimmer": "Einzel-Zimmer 🛏️",
    "Doppelzimmer": "Doppel-Zimmer 🛏️ 🛏️",
    "Suite": "Suite 🏨"
  };

  const cityEmojis = {
    "Berlin": "B 🇩🇪",
    "Los_Angeles": "LA 🌴",
    "Singapur": "SG 🇸🇬"
  };

  const getAmenitiesEmojis = (amenities) => {
    return amenities.split(', ').map(amenity => amenityEmojis[amenity] || amenity).join(' ');
  };

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await fetch(`http://localhost:3000/rooms-admin?hotelName=${hotelName}&checkIn=${checkIn}&checkOut=${checkOut}`);
      const data = await response.json();
      const formattedData = data.map(booking => ({
        country: cityEmojis[hotelName],
        roomType: roomTypeEmojis[booking.ZimmerTyp] || booking.ZimmerTyp,
        amenities: getAmenitiesEmojis(booking.AusstattungBeschreibungen),
        dates: `${booking.CheckInDatum} - ${booking.CheckOutDatum}`
      }));
      setBookings(formattedData);
    };

    fetchBookings();
  }, [hotelName, checkIn, checkOut]);

  // Liste der Länder für das Dropdown-Menü
  const countries = [
    "Berlin", "Los_Angeles", "Singapur"
  ];

  return (
    <div className={`flex justify-center items-center h-screen relative`}>
      {/* Hintergrundbild */}
      <Image 
        className={`absolute -z-10 blur-xl inset-0 w-full h-full object-cover`}
        src={berlinImage} 
        alt="Los Angeles" 
      />
      
      {/* Container für die beiden Divs */}
      <div className={`flex w-full h-full mx-2 my-10 justify-center items-center rounded-3xl p-10`}>
        <div 
          className={`flex flex-col w-full bg-gray-300 p-10 text-md h-full rounded-3xl font-bold uppercase font-mono`}
        >
          {/* Header mit Buchungen und Filteroptionen */}
          <div className={`flex justify-between items-center py-5 bg-blue-400 border-black border border-1 rounded-t-3xl px-5 `}>
            <div className={`text-2xl font-bold text-center uppercase`}>
              Bookings 🛎️
            </div>
            {/* Filteroptionen */}
            <div className={`flex text-xs flex-row items-center gap-x-2`}>
              <div className={`relative`}>
                <select 
                  id="city" 
                  className={`border border-black rounded-3xl p-2 appearance-none`} 
                  placeholder="Hotel"
                  onChange={(e) => setHotelName(e.target.value)}
                >
                  <option value="" disabled selected hidden>Hotel</option>
                  {countries.map((country, index) => (
                    <option key={index} value={country}>{cityEmojis[country]}</option>
                  ))}
                </select>
              </div>
              <div className={`flex flex-col`}>
                <input 
                  type="date" 
                  id="from" 
                  className={`border border-black rounded-3xl p-1`} 
                  placeholder="From"
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>
              <div className={`flex flex-col`}>
                <input 
                  type="date" 
                  id="to" 
                  className={`border border-black rounded-3xl p-1`} 
                  placeholder="To"
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          {/* Buchungen */}
          <div 
            className={`flex flex-col overflow-y-scroll bg-white text-sm h-full border-t-0 border border-1 border-black rounded-b-3xl font-bold text-left font-mono`}
          >
            {bookings.map((booking, index) => (
              <div 
                key={index}
                className={`flex flex-row w-full py-5 bg-white border-b border-1 border-black`}
              >
                <div className={`flex w-full justify-center w-2/5`}>{booking.country}</div>
                <div className={`flex w-full w-3/5 justify-start`}>{booking.roomType}</div>
                <div className={`flex w-full justify-center w-2/5`}>{booking.amenities}</div>
                <div className={`flex w-full w-3/5 justify-start`}>{booking.dates}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
