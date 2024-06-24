"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import berlinImage from '../../../imgs/los-angeles.jpg';

export default function Booking() {
  const [customers, setCustomers] = useState([]);
  const [checkIn, setCheckIn] = useState('2024-01-01');
  const [checkOut, setCheckOut] = useState('2024-12-31');
  const [countBookings, setCountBookings] = useState(1);

  const cityEmojis = {
    "Berlin": "B 🇩🇪",
    "Los_Angeles": "LA 🌴",
    "Singapur": "SG 🇸🇬"
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await fetch(`http://193.31.27.54:3000/customers-admin?checkIn=${checkIn}&checkOut=${checkOut}&countBookings=${countBookings}`);
      const data = await response.json();
      const formattedData = data.map(customer => ({
        name: `${customer.Vorname} ${customer.Nachname}`,
        bookings: customer.AnzahlBuchungen,
        countries: cityEmojis[customer.HotelName] || customer.HotelName,
        dates: `${customer.ErsterCheckIn} - ${customer.LetzterCheckOut}`
      }));
      setCustomers(formattedData);
    };

    fetchCustomers();
  }, [checkIn, checkOut, countBookings]);

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
              Customers 🛎️
            </div>
            {/* Filteroptionen */}
            <div className={`flex text-xs flex-row items-center gap-x-2`}>
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
              <div className={`flex items-center`}>
                <span>{'>'}</span>
                <input 
                  type="number" 
                  id="countBookings" 
                  className={`border border-black rounded-3xl p-1 w-12 mx-1`} 
                  onChange={(e) => setCountBookings(e.target.value)}
                />
                <span>🛎️</span>
              </div>
            </div>
          </div>
          
          {/* Kunden */}
          <div 
            className={`flex flex-col overflow-y-scroll bg-white text-sm h-full border-t-0 border border-1 border-black rounded-b-3xl font-bold text-left font-mono`}
          >
            {customers.map((customer, index) => (
              <div 
                key={index}
                className={`flex flex-row w-full py-5 bg-white border-b border-1 border-black`}
              >
                <div className={`flex w-full justify-center w-2/5`}>👤 {customer.name}</div>
                <div className={`flex w-full w-3/5 justify-start`}>🛎️ {customer.bookings}</div>
                <div className={`flex w-full justify-center w-2/5`}>{customer.countries}</div>
                <div className={`flex w-full w-3/5 justify-start`}>🗓️ {customer.dates}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
