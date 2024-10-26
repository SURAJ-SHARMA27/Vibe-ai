"use client";
import Link from "next/link";
import { Spotlight } from "./Spotlight";
import {  ButtonUI } from "./moving-border";
import { ContainerScroll } from "./container-scroll-animation";
import Image from "next/image";
import axios from 'axios';

import { PlaceholdersAndVanishInput } from "./placeholders-and-vanish-input";
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeadsetIcon from '@mui/icons-material/Headset';
import { CardSpotlightDemo } from "./Card-spot";
import { useEffect, useRef, useState } from "react";
import { IconButton, Slider } from '@mui/material';
import { PlayArrow, Pause } from '@mui/icons-material';
import "./hero.css"
import toast from 'react-hot-toast';
import { SignupFormDemo } from "./SignUpFormDemo";
import { LoginForm } from "./LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Vortex } from "./vortex";
import { setFavoriteTracks } from "@/store/favouriteSlice";
const rotatingStyle = {
  animation: 'spin 30s linear infinite',
};
const HeroSection = () => {
  const [play,setPlay]=useState(false)
  const [progress, setProgress] = useState(0);  // Tracks the current progress
  const [track, setTrack] = useState<any>({ data: [] });
  const [playingSong,setPlayingSong]=useState("");
  const [playingImage,setPlayingImage]=useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const isLoggedIn = useSelector((state: RootState) => state.login.isLoggedIn);
  const token=useSelector((state: RootState) => state.login.token);
 
  const openModal = () => {
    setShowModal(true);
  };
  const openLoginModal = () => {
    setShowLoginModal(true);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFavoriteTracks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/favtList', {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token in headers
          },
        });
         dispatch(setFavoriteTracks(response.data.favtTracks)); // Dispatch action to store in Redux

      } catch (error) {
        console.error('Error fetching favorite tracks:', error);
      }
    };

    if (isLoggedIn) {
      fetchFavoriteTracks();
    } 
  }, [isLoggedIn]);
   const placeholders = [
    "Search for your favorite song...",
    "Find the latest trending tracks...",
    "Looking for that perfect playlist song?",
    "Type the name of any artist or album...",
    "Discover and download HD songs instantly!",
  ];
  const [inputValue, setInputValue] = useState(''); 
  const [songItem, setSongItem] = useState([]); 
  const audioRef = useRef<any>(null);
  useEffect(() => {
    const stopPreviousAudio = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
        setPlay(false); // Ensure previous audio is stopped, setting state to false
      }
    };

    const playNewAudio = () => {
      const blob = new Blob([track.data], { type: 'audio/mp4' });
      const audioUrl = window.URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);
      audio.preload = 'auto';

      audio.play().then(() => setPlay(true)); // Set state to true when audio starts playing
      audioRef.current = audio;

      // Update progress bar as audio plays
      audio.addEventListener('timeupdate', () => {
        setProgress((audio.currentTime / audio.duration) * 100);
      });
    };

    stopPreviousAudio();  // Stop any previous audio
    playNewAudio();       // Play new audio

    return () => stopPreviousAudio(); // Cleanup on unmount or track change
  }, [track]);

  // Handle play/pause toggle
  const handleTogglePlayPause = () => {
    if (audioRef.current) {
      if (play) {
        audioRef.current.pause();
        setPlay(false);
      } else {
        audioRef.current.play();
        setPlay(true);
      }
    }
  };

  // Handle slider change to adjust the progress of the song
  const handleSliderChange = (event:any, newValue:any) => {
    if (audioRef.current) {
      audioRef.current.currentTime = (newValue / 100) * audioRef.current.duration;
      setProgress(newValue);
    }
  };

  const handleChange = (e:any) => {
  setInputValue(e.target.value)
  onSubmit();
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
            id:item.id
        }));

        setSongItem(extractedData);  // Store extracted data in state
     } catch (error) {
        console.error('Error fetching data:', error);
    }
};
 
  return (
    <>
      <div
        className="h-[80vh] md:h-[70vh] w-full flex flex-col justify-center items-center relative overflow-hidden mx-auto py-10 md:py-0"
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
          <HeadsetIcon style={{color:"#0b84bb",fontSize:"30px"}}/> &nbsp;
           user vibes &nbsp;

   {/* <img src="https://user-images.githubusercontent.com/48355572/263672801-5929885f-9227-4be3-a686-ea3fbeff13d2.gif" width="23px" height="23px"/> */}
   {/* <FavoriteIcon/> */}
  
</p>






        </div>
       { !isLoggedIn &&(
        <div className="mt-10 text-center">
  <ButtonUI
    borderRadius="1.75rem"
    className="bg-[#1a1a1a] text-black dark:text-white border-neutral-200 dark:border-slate-800"
    duration={4000}
    onClick={openModal} // Call openModal on button click
  >
    Sign Up
  </ButtonUI>
  <div className="mt-4">
  <span className="text-md text-gray-600 dark:text-gray-400">
  Already have an account?{" "}
  <button
    style={{
      color: "#0b84bb", // Tailwind's gray-600
      transition: "color 0.3s", // Optional for a smooth transition
    }}
    onClick={openLoginModal}
    onMouseEnter={(e) => {
      e.currentTarget.style.color = "white"; // Change to bright red on hover
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.color = "#0b84bb"; // Revert to gray-600
    }}
   >
  <b>  Log In</b>
  </button>
</span>


  </div>
</div>
       )}

          <SignupFormDemo showModal={showModal} setShowModal={setShowModal} />
          <LoginForm  showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} />
          </div>
        {isLoggedIn &&(
 <div className="w-full mx-auto rounded-md  h-[20rem] overflow-hidden">
 <Vortex
   backgroundColor="black"
   className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
 >
   <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
   Welcome Back, Suraj
   </h2>
   <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
   You can now save, share, and download HD songs for free using the power of Vibe AI.

   </p>
   
 </Vortex>
</div>
        )} 
   
      {playingSong!='' &&(
        <div
      style={{
        backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)', // Change background on hover
        backdropFilter: 'blur(15px)',                // Increased blur for a more glassy effect
        borderRadius: '0.5rem',                      // Rounded corners
        padding: '1rem',                             // Padding
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)', // Shadow for depth
        transition: 'background-color 0.4s ease, transform 0.4s ease',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)'  // Smooth transition for hover
      }}
      className="w-60 text-white mx-auto"
      onMouseEnter={() => setIsHovered(true)}      // Set hover state to true on mouse enter
      onMouseLeave={() => setIsHovered(false)}     // Set hover state to false on mouse leave
    >
      {/* Hollow Song Image with Play/Pause Button */}
      <div className="relative flex flex-col items-center ">
        {playingImage && (
          <img
            src={playingImage}
            alt="Song cover"
            className={`rounded-full w-24 h-24 border-2 border-white opacity-80 ${play ? 'rotating' : ''}`} // Apply rotation class when playing
            style={{ objectFit: 'cover', ...(play ? rotatingStyle : {}) }} // Apply rotation when playing
          />
        )}

        {/* Play/Pause Button at the bottom center of the image */}
        <IconButton
          onClick={handleTogglePlayPause}
          className="absolute z-10 text-white mt-5"
          style={{ borderRadius: '50%' }} // Optional: Add a background to the button
        >
          {play ? <Pause style={{color:"rgba(255, 255, 255, 0.4)"}} fontSize="large" /> : <PlayArrow style={{color:"rgba(255, 255, 255, 0.4)"}} fontSize="large" />}
        </IconButton>
      </div>

      {/* Progress Slider */}
      <Slider
  value={progress}
  onChange={handleSliderChange}
  aria-labelledby="continuous-slider"
  sx={{
    color: '#3B30C8', // Change this to your site's primary color
    '& .MuiSlider-thumb': {
      backgroundColor: '#fff', // Thumb color
      '&:hover': {
        boxShadow: 'inherit',
      },
    },
    '& .MuiSlider-track': {
      backgroundColor: 'rgba(255, 255, 255, 0.4)', // Track color
    },
    '& .MuiSlider-rail': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)', // Rail color
    },
  }}
/>


      {/* Song Title */}
      <p className="mt-1 font-normal text-base md:text-lg text-neutral-300 max-w-lg text-center">
        {playingSong}
      </p>
    </div>)}




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
            setPlay={setPlay}
            play={play}
            setTrack={setTrack}
            setPlayingSong={setPlayingSong}
            setPlayingImage={setPlayingImage}
            id={song.id}
          
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
 