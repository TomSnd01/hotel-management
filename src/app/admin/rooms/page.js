import Image from 'next/image';
import berlinImage from '../../../imgs/los-angeles.jpg';

export default function Rooms() {
  const bookings = [
    "SG 🇸🇬, Doppel-Zimmer 🛏️ 🛏️, 📶 🌇 🛁, 27.02.24-03.03.24",
    "LA 🌴, Suite 🏨, 📶 🌊 🛁, 02.01.24-05.01.24",
    "NY 🗽, Einzelzimmer 🛏️, 📶 🌆 🛁, 10.03.24-12.03.24",
    "TK 🕌, Familienzimmer 🛏️ 🛏️ 🛏️, 📶 🌅 🛁, 15.04.24-20.04.24",
    "JP 🗻, Doppel-Zimmer 🛏️ 🛏️, 📶 🌸 🛁, 05.05.24-10.05.24",
    "FR 🥐, Suite 🏨, 📶 🌉 🛁, 25.06.24-30.06.24",
    "IT 🍕, Einzelzimmer 🛏️, 📶 🌞 🛁, 15.07.24-20.07.24"
  ];

  // Liste der Länder für das Dropdown-Menü
  const countries = [
    "SG 🇸🇬", "LA 🌴", "NY 🗽", "TK 🕌", "JP 🗻", "FR 🥐", "IT 🍕"
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
                <select id="city" className={`border border-black rounded-3xl p-2 appearance-none`} placeholder="Hotel">
                  <option value="" disabled selected hidden>Hotel</option>
                  {countries.map((country, index) => (
                    <option key={index} value={country}>{country}</option>
                  ))}
                </select>
              </div>
              <div className={`flex flex-col`}>
                <input type="date" id="from" className={`border border-black rounded-3xl p-1`} placeholder="From" />
              </div>
              <div className={`flex flex-col`}>
                <input type="date" id="to" className={`border border-black rounded-3xl p-1`} placeholder="To" />
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
                {booking.split(',').map((part, subIndex) => (
                  <div key={subIndex} className={`flex w-full ${subIndex === 1 || subIndex === 3 ? 'w-3/5 justify-start' : 'justify-center w-2/5'}`}>{part.trim()}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
