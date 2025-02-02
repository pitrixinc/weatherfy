import Head from 'next/head';
import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { FaHome, FaInfoCircle, FaEnvelope, FaConciergeBell } from 'react-icons/fa';
import Weather from '../components/Weather';
import Spinner from '../components/Spinner';
import NavBar from '@/components/NavBar';
import Banner from '@/components/Banner';
import MyWeather from '@/components/Weather/MyWeather';
import AccraWeather from '@/components/Weather/AccraWeather';
import Footer from '@/components/Footer';
import Services from '@/components/Services';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative bg-cover bg-center shadow dark:bg-gray-800"
    style={{ backgroundImage: "url('/images/back1.jpeg')" }}>
      <Head>
        <title>Weatherfy App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
       
        <NavBar/>
        <main>
          <AccraWeather/>
        {/*  <Banner/>
          <h1 className="text-4xl font-bold text-center">Weather App</h1> */}
          <MyWeather/>
          <Services/>
          <Footer/>
        </main>
      </>
    </div>
  );
}
