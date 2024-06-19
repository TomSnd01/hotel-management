import React, { useState } from 'react';

const Dialog = ({ city, description, getClass, selected, setDialogPage, dialogPage, selectedRoom, setSelectedRoom }) => {
    const handleRoomClick = (room) => {
        setSelectedRoom(room);
    };

    return (
        <div className={`
            flex
            absolute
            self-center
            gap-x-10
            mx-6
            z-30
            ${selected === city ? 'visible' : 'hidden'}
        `}>
            <div className={`w-1/2 text-sm font-normal text-white flex flex-col justify-center items-start self-center`}>
                <h2 className={`uppercase text-left text-[calc((1.0625rem+2.2604vw)*1.618)] leading-tight font-bold text-stroke-3 ${getClass(city, 'color')}`}>{city}</h2><br />
                <span className={`text-stroke-1 font-mono text-[calc(((1.0625rem+2.2604vw)/1.618)/1.618)] leading-tight`}>{description}</span>
            </div>

            {/* Page 0 */}
            {dialogPage === 0 && <div className={`w-1/2 flex flex-col justify-center items-center`}>
                <div className={`font-mono bg-gray-300 rounded-t-3xl px-10 pt-20 flex flex-col w-full h-[1000px] max-h-[500px]`}>
                    <form className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="from" className="uppercase block font-medium text-black ml-4 text-[calc(1.0625rem)]">From</label>
                            <input type="date" id="from" name="from" className="mt-1 p-3 w-full border border-black rounded-3xl"/>
                        </div>
                        <div>
                            <label htmlFor="to" className="uppercase block font-medium text-black ml-4 text-[calc(1.0625rem)]">To</label>
                            <input type="date" id="to" name="to" className="mt-1 p-3 w-full border border-black rounded-3xl"/>
                        </div>
                        <div>
                            <label htmlFor="name" className="uppercase block font-medium text-black ml-4 text-[calc(1.0625rem)]">Name</label>
                            <input type="text" id="name" name="name" className="mt-1 p-3 w-full border border-black rounded-3xl"/>
                        </div>
                        <div>
                            <label htmlFor="email" className="uppercase block font-medium text-black ml-4 text-[calc(1.0625rem)]">E-Mail</label>
                            <input type="email" id="email" name="email" className="mt-1 p-3 w-full border border-black rounded-3xl"/>
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="phone" className="uppercase block font-medium text-black ml-4 text-[calc(1.0625rem)]">Phone Number</label>
                            <input type="tel" id="phone" name="phone" className="mt-1 p-3 w-full border border-black rounded-3xl"/>
                        </div>
                    </form>
                </div>
                <button 
                    className={`${getClass(city, 'bgcolor')} hover:bg-white border-8 ${getClass(city, 'borderHover')} transition-all duration-100 w-full p-5 rounded-b-3xl font-mono !cursor-pointer`}
                    onClick={() => setDialogPage(1)}
                >CHOOSE ROOMS 🔑</button>
            </div> }

            {/* Page 1 */}
            {dialogPage === 1 && <div className={`w-1/2 flex flex-col justify-center items-center`}>
                <div className={`font-mono bg-gray-300 rounded-t-3xl px-10 pt-20 flex flex-col w-full h-[1000px] max-h-[500px]`}>
                    <div className={`${getClass(city, 'bgcolor')} px-5 py-2 rounded-t-3xl border-x border-t border-1 border-black text-center`}>Rooms 🔑</div>
                    <div className={`flex flex-col bg-white border rounded-b-3xl border-1 border-black h-96 max-h-48 overflow-y-scroll`}>
                        {['Einzel-zimmer 🛏️', 'Doppel-Zimmer 🛏️ 🛏️', 'Suiten 🏨'].map((room) => (
                        <div
                            key={room}
                            className={`px-5 p-2 border-b border-1 border-black cursor-pointer ${selectedRoom === room ? getClass(city, 'bgcolorLight') : ''}`}
                            onClick={() => handleRoomClick(room)}
                        >
                            {room}
                        </div>
                        ))}
                    </div>
                    <div className={`my-auto`}>
                        <div className="flex items-center gap-x-5">
                            <div className="flex items-center">
                                <input type="checkbox" id="wifi" name="wifi" className="h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
                                <label htmlFor="wifi" className="uppercase block font-medium text-black ml-2 text-[calc(1.0625rem)]">WLAN 📶</label>
                            </div>
                            <div className="flex items-center">
                                <input type="checkbox" id="balcony" name="balcony" className="h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
                                <label htmlFor="balcony" className="uppercase block font-medium text-black ml-2 text-[calc(1.0625rem)]">Balkon 🌇</label>
                            </div>
                        </div>
                        <div className="flex items-center gap-x-5">
                            <div className="flex items-center">
                                <input type="checkbox" id="seaview" name="seaview" className="h-4 w-4 text-indigo-600 border-black rounded"/>
                                <label htmlFor="seaview" className="uppercase block font-medium text-black ml-2 text-[calc(1.0625rem)]">Meerblick 🌊</label>
                            </div>
                            <div className="flex items-center">
                                <input type="checkbox" id="bathtub" name="bathtub" className="h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
                                <label htmlFor="bathtub" className="uppercase block font-medium text-black ml-2 text-[calc(1.0625rem)]">BADEWANNE 🛁</label>
                            </div>
                        </div>
                    </div>
                </div>

                <button 
                className={`${getClass(city, 'bgcolor')} hover:bg-white border-8 ${getClass(city, 'borderHover')} transition-all duration-100 uppercase w-full p-5 rounded-b-3xl font-mono !cursor-pointer`}
                onClick={() => setDialogPage(2)}
                >Book Now 🛎️</button>
            </div> }

            {/* Page 2 */}
            {dialogPage === 2 && <div className={`w-1/2 flex flex-col my-auto`}>
                <div className={`bg-gray-300 font-bold text-[calc(((1.0625rem+2.2604vw))/1.618)] leading-tight rounded-3xl px-10 flex flex-col justify-center items-center w-full h-[1000px] max-h-[500px]`}>
                <span className={`text-center uppercase `}>Buchung</span>
                <span className={`text-center uppercase `}>Versendet ✅</span>
                </div>
            </div> }
        </div>
    );
};

export default Dialog;
