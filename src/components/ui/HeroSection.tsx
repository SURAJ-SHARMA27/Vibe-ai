"use client";
import Link from "next/link";
import { Spotlight } from "./Spotlight";
import { Button } from "./moving-border";
import { ContainerScroll } from "./container-scroll-animation";
import Image from "next/image";
import axios from 'axios';

import { PlaceholdersAndVanishInput } from "./placeholders-and-vanish-input";
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeadsetIcon from '@mui/icons-material/Headset';
import { CardSpotlightDemo } from "./Card-spot";
import { useState } from "react";
const HeroSection = () => {
  const placeholders = [
    "Search for your favorite song...",
    "Find the latest trending tracks...",
    "Looking for that perfect playlist song?",
    "Type the name of any artist or album...",
    "Discover and download HD songs instantly!",
  ];
  const [inputValue, setInputValue] = useState(''); 
  const [songItem, setSongItem] = useState([]); 
  const handleChange = (e:any) => {
  setInputValue(e.target.value)
  };
  const onSubmit = async () => {
    const formattedQuery = inputValue.split(' ').join('+');

    const apiUrl = `/api/api.php?p=1&q=${formattedQuery}&_format=json&_marker=0&api_version=4&ctx=web6dot0&n=20&__call=search.getResults`;

    try {
        const response = await axios.get(apiUrl);
        console.log(response, "here is the response");
        const results = response.data.results || [];  // Get the results array from the response
        
        // Extract titles, subtitles, and images
        const extractedData = results.map((item:any) => ({
            title: item.title,
            subtitle: item.subtitle,
            image: item.image,
            year:item.year,
            mpUrl:item.more_info.encrypted_media_url,
        }));

        setSongItem(extractedData);  // Store extracted data in state
        console.log(extractedData,"extractedData")
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

  return (
    <>
      <div
        className="h-[80vh] md:h-[60vh] w-full flex flex-col justify-center items-center relative overflow-hidden mx-auto py-10 md:py-0"
      >
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
        <div className="mt-40 relative z-10 w-full text-center">
        <h1
  className="mt-30 text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400"
  style={{ lineHeight: '1.1' }} // Adjust as needed
>
  Vibe AI
</h1>
          <p
            className="mt-4 font-normal text-base md:text-lg text-neutral-300 max-w-lg mx-auto"
          >
Download your favorite HD songs instantly, completely free! No signups, no logins required – simply search for the song you love and hit download. Enjoy hassle-free music at your fingertips!        </p>
          <div className="mt-10">
            {/* <Button
              borderRadius="1.75rem"
              className="bg-[#1a1a1a]  text-black dark:text-white border-neutral-200 dark:border-slate-800"
              duration={4000}
            >
              <Link href={"/request"}>Get 25  Backtests</Link>
            </Button> */}
              <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
          </div>
          <p className="mt-10 font-normal text-base md:text-lg text-neutral-300 max-w-lg mx-auto flex items-center justify-center">
          Vibe AI - made with &nbsp;
          <HeadsetIcon style={{color:"orange",fontSize:"30px"}}/> &nbsp;
           user vibes &nbsp;

   {/* <img src="https://user-images.githubusercontent.com/48355572/263672801-5929885f-9227-4be3-a686-ea3fbeff13d2.gif" width="23px" height="23px"/> */}
   {/* <FavoriteIcon/> */}
  
</p>






        </div>
      </div>
      
      {songItem.length > 0 && (
  <div className="flex justify-center items-center gap-4 mt-10 mb-20 justify-center">
    <div className="flex flex-wrap justify-center"> {/* Added gap-4 */}
      {songItem.map((song:any, index) => (
        <div style={{margin:"5px"}}>
          <CardSpotlightDemo
            title={song.title}
            description={song.subtitle}
            url={song.image}
            year={song.year}
            mpUrl={song.mpUrl}
          />
          </div>
      ))}
    </div>
  </div>
)}

  <div className="flex flex-wrap justify-center gap-4 mt-10 mb-20">
     <div className="flex flex-col md:flex-row justify-center gap-4 ">
      
     {/* <CardSpotlightDemo
  title="Simple, Fast, & Free Templates"
  description="Access a wide range of ready-to-use templates tailored for everyday trading needs. Whether you’re just starting or refining your strategy, our templates simplify the process, helping you save time and get trading with minimal effort."
  footer="Start with just a click and streamline your trading like never before."
/>

<CardSpotlightDemo
  title="Super Fast Backtesting Speeds"
  description="Test your strategies on over 5 years of historical data with lightning speed. Our platform allows you to refine and optimize your trades in a fraction of the time, giving you a clear edge over the market without any cost."
  footer="Experience rapid, data-driven backtesting without limitations."
/>

<CardSpotlightDemo
  title="Seamless Execution of Strategies"
  description="Execute your strategies effortlessly with just one click. No more complex setups or delays—run your trades in real-time and focus on what really matters: your trading performance."
  footer="Take control of your trading with seamless, one-click execution."
/> */}


</div>
</div>

   
    </>
  );
};


export default HeroSection;
