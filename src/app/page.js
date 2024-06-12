import Image from "next/image";
import berlinImage from '../imgs/berlin.jpg';
import singaporeImage from '../imgs/singapore.jpg';
import losAngelesImage from '../imgs/los-angeles.jpg';

export default function Home() {
  return(
      <div>
      <Image src={berlinImage} width={500} height={500} alt="Berlin"></Image>,
    <Image src={singaporeImage} width={500} height={500} alt="Singapore"></Image>,
    <Image src={losAngelesImage} width={500} height={500} alt="Los-Angeles"></Image>
      </div>
  );
}
