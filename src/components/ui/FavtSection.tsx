"use client";
 import { Spotlight } from "./Spotlight";
import Image from "next/image";
import axios from 'axios';
import { CardSpotlightDemo } from "./Card-spot";
import { useEffect, useRef, useState } from "react";
import { IconButton, Slider } from '@mui/material';
import { PlayArrow, Pause } from '@mui/icons-material';
import "./hero.css"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Vortex } from "./vortex";
import { setFavoriteTracks } from "@/store/favouriteSlice";
import { ButtonUI } from "./moving-border";
import Link from "next/link";
const rotatingStyle = {
  animation: 'spin 30s linear infinite',
};
const FavtSection = () => {
  const [play,setPlay]=useState(false)
  const [progress, setProgress] = useState(0);  // Tracks the current progress
  const [track, setTrack] = useState<any>({ data: [] });
  const [playingSong,setPlayingSong]=useState("");
  const [playingImage,setPlayingImage]=useState("");
  const [isHovered, setIsHovered] = useState(false);
  const isLoggedIn = useSelector((state: RootState) => state.login.isLoggedIn);
  const userInfo = useSelector((state: RootState) => state.login.userInfo);
  const favtList=useSelector((state:RootState)=>state.favorites.tracks);
  const token=useSelector((state: RootState) => state.login.token);
 const FavMap=Object.values(favtList);
  const dispatch = useDispatch();
 
  useEffect(() => {
    const fetchFavoriteTracks = async () => {
      try {
        const response = await axios.get('/backend-api/api/user/favtList', {
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
    const handleSongEnd = async () => {
const currentIndex = FavMap.findIndex(song => song.title === playingSong);
const nextIndex = (currentIndex + 1) % FavMap.length;
const nextEle = FavMap[nextIndex];

try {
  setPlayingSong(nextEle.title)
  setPlayingImage(nextEle.url)
  const encodedUrl = encodeURIComponent(nextEle.mpUrl);
  const apiUrl = `/api/api.php?__call=song.generateAuthToken&url=${encodedUrl}&bitrate=128&api_version=4&_format=json&ctx=web6dot0&_marker=0`;

  // Fetching download URL  
  const response = await axios.get(apiUrl);
  const downloadUrl = response.data.auth_url;

  // Adjust the download URL to use the proxy
  const proxyDownloadUrl = downloadUrl.replace('https://ac.cf.saavncdn.com', '/media/ac');

  // Fetch the file response without specifying responseType
  const fileResponse = await axios.get(proxyDownloadUrl, { responseType: 'arraybuffer' });
  setTrack(fileResponse)
  console.log(fileResponse, "file"); // Inspect the file response

} catch (error) {
  console.error("Error fetching the download link or file:", error);
} finally {
}

};


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
      const blob = new Blob([track.data], { type: "audio/mp4" });
      const audioUrl = window.URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);
      audio.preload = "auto";

      audio.play().then(() => setPlay(true)); // Set state to true when audio starts playing
      audioRef.current = audio;

      // Update progress bar as audio plays
      audio.addEventListener("timeupdate", () => {
        setProgress((audio.currentTime / audio.duration) * 100);
      });

      // Add an event listener for when the song ends
      audio.addEventListener("ended", handleSongEnd);
    };

    stopPreviousAudio(); // Stop any previous audio
    playNewAudio(); // Play new audio

    return () => {
      stopPreviousAudio(); // Cleanup on unmount or track change
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleSongEnd); // Remove the event listener
      }
    };
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

  const name = typeof window !== "undefined" ? localStorage.getItem('firstName') : null;

 
  return (
    <>
   
        {isLoggedIn &&(
 <div className="w-full mx-auto rounded-md  h-[20rem] overflow-hidden">
     <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />  
 <Vortex
   backgroundColor="black"
   className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
 >
   <h2 className="text-white text-2xl md:text-6xl font-bold text-center mt-20">
   Welcome Back, {name}
   </h2>
   <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
Listen to your favourite song here for free.
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




    <div className="flex justify-center items-center gap-4 mt-10 mb-20">
  {FavMap.length > 0 ? (
    <div className="flex flex-wrap justify-center gap-4">
      {FavMap.map((song, index) => (
        <div key={song.id} style={{ margin: "5px" }}>
          <CardSpotlightDemo
            title={song.title}
            description={song.description}
            url={song.url}
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
  ) : (
    <div className="flex flex-col items-center text-center">
       <Link href="/">
      <ButtonUI
    borderRadius="1.75rem"
    className="bg-[#1a1a1a] text-black dark:text-white border-neutral-200 dark:border-slate-800"
    duration={4000}
  >
 Add Favourites
 
   </ButtonUI>
   </Link>
    </div>
  )}
</div>


  <div className="flex flex-wrap justify-center gap-4 mt-10 mb-20">
     <div className="flex flex-col md:flex-row justify-center gap-4 ">
      
 

</div>
</div>

    </>
  );
};


export default FavtSection;
 