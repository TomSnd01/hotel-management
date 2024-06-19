import Image from 'next/image';
import Link from 'next/link';
import berlinImage from '../../imgs/los-angeles.jpg';

export default function Admin() {
  return (
    <div className={`flex justify-center items-center h-screen relative`}>
      {/* Hintergrundbild */}
      <Image 
        className={`absolute -z-10 blur-xl inset-0 w-full h-full object-cover`}
        src={berlinImage} 
        alt="Los Angeles" 
      />
      
      {/* Container für die beiden Divs */}
      <div className={`flex w-full h-full m-10 justify-center gap-10 items-center rounded-3xl p-10`}>
        {/* Linker Div */}
        <Link 
          className={`w-1/2 hover:border-8 hover:border-blue-400 bg-gray-300 text-4xl h-full rounded-3xl font-bold text-center uppercase font-mono`}
          href="/admin/rooms"
        >
          <button
            className={`h-full`}
          >
            Zimmer<br /><br />🔑
          </button>
        </Link>
        
        {/* Rechter Div */}
        <Link 
          className={`w-1/2 hover:border-8 hover:border-blue-400 bg-gray-300 text-4xl h-full rounded-3xl font-bold text-center uppercase font-mono`}
          href="/admin/booking"
        >
          <button className={`bg-gray-300 h-full font-bold text-center uppercase font-mono`}>
            Personen<br /><br />👥
          </button>
        </Link>
      </div>
    </div>
  );
}
