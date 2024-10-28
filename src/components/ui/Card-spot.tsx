"use client";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { CircularProgress } from "@mui/material";
import axios from 'axios';
import { useEffect, useState } from "react";
import DownloadIcon from '@mui/icons-material/Download';
import { LineStyle, PlayArrow } from "@mui/icons-material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { RootState } from "@/store/store";
import toast from "react-hot-toast";
import { setFavoriteTracks } from "@/store/favouriteSlice";
interface CardSpotlightDemoProps {
    title: string;       // Title prop
    description: string; // Description prop
    year: any;      // Footer prop
    url:any;
    mpUrl:any;
    setPlay:any;
    play:any;
    setTrack:any;
    setPlayingImage:any;
    setPlayingSong:any;
    id:string;
  }
  
  export function CardSpotlightDemo({ title, description, year,url,mpUrl,setPlay,play,setTrack,setPlayingImage, setPlayingSong,id}: CardSpotlightDemoProps) {
    const token = useSelector((state: RootState) => state.login.token);
    const favtList=useSelector((state:RootState)=>state.favorites.tracks);
  const dispatch = useDispatch();

 
    const [loading, setLoading] = useState(false); 
    const [loadingPlay, setLoadingPlay] = useState(false); 

    const truncateText = (text: string, wordLimit: number): string => {
      const words = text?.split(" ");
      if (words?.length > wordLimit) {
        return words.slice(0, wordLimit).join(" ") + " ..."; // Add ellipsis
      }
      return text; // Return original text if it's within the limit
    };
  
    const handleDownload = async () => {
      setLoading(true);
      try {
        const encodedUrl = encodeURIComponent(mpUrl);
        const apiUrl = `/api/api.php?__call=song.generateAuthToken&url=${encodedUrl}&bitrate=128&api_version=4&_format=json&ctx=web6dot0&_marker=0`;
    
        // Fetching download URL  
        const response = await axios.get(apiUrl);
        const downloadUrl = response.data.auth_url;
    
        // Adjust the download URL to use the proxy
        const proxyDownloadUrl = downloadUrl.replace('https://ac.cf.saavncdn.com', '/media/ac');
    
        // Fetch the file response without specifying responseType
        const fileResponse = await axios.get(proxyDownloadUrl, { responseType: 'arraybuffer' });
    
        console.log(fileResponse, "file"); // Inspect the file response
    
        // Convert the ArrayBuffer to a Blob
        const blob = new Blob([fileResponse.data], { type: 'audio/mp4' });
    
        // Create a download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download =`${title}.mp3`; // Set the desired file name
        document.body.appendChild(a);
        a.click(); // Trigger the download
        document.body.removeChild(a); // Clean up
    
        // Optionally, revoke the object URL after some time
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
        }, 100);
    
      } catch (error) {
        console.error("Error fetching the download link or file:", error);
      } finally {
        setLoading(false);
      }
    };
    const handleFavt = async () => {
      toast.promise(
        new Promise<string>(async (resolve, reject) => {
          try {
            const response = await axios.post(
              '/backend-api/api/user/save-track',
              { title, description, year, url, mpUrl, id },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              }
            );
            dispatch(setFavoriteTracks(response.data.favtTracks))
            if (response.data.message.includes('added')) {
              console.log('Track added to favorites');
               resolve('Track added to favorites'); // Success message for "added"
            } else if (response.data.message.includes('removed')) {
              console.log('Track removed from favorites');
               resolve('Track removed from favorites'); // Success message for "removed"
            }
          } catch (error) {
            console.error('Failed to update favorite track:', error);
            reject(error); // Reject promise on error
          }
        }),
        {
          loading: "Processing...",
          success: (message: string) => message, // Use the resolved message directly as a string
          error: "Failed to update favorite track. Please try again.",
        }
      );
    };
    
   const handlePlay = async ()=>{
    setLoadingPlay(true)
    try {
      setPlayingSong(title)
      setPlayingImage(url)
      const encodedUrl = encodeURIComponent(mpUrl);
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
      setLoadingPlay(false);
    }

   }

    return (
<CardSpotlight className="h-[28rem]"   id="cardspot">
  {/* Image at the top */}
  <div className="flex justify-center mt-4">
    <img
      src={url}
      alt={title}
      style={{ zIndex: 9991 }}
      className="w-24 h-24 object-cover rounded-full border-2 border-white" // Add border for better visibility
    />
  </div>
  {/* Overlay effect for better text readability */}
  <div className="absolute inset-0 bg-black opacity-30 rounded-t-lg"></div>

  <div className="p-4 relative z-10 flex flex-col items-center justify-center h-full">
    {/* Title */}
    <p className="text-xl font-bold text-white text-center">        {truncateText(title, 6)}    </p>

    {/* Description */}
    <div className="text-neutral-200 mt-2 text-center"> {/* Center align the description */}
     {truncateText(description, 6)}
    </div>

    {/* Year */}
    <p className="text-neutral-300 mt-4 text-sm text-center">{year}</p>
    <div className="flex justify-center space-x-4 mt-4"> {/* Flex container for horizontal alignment */}
  <button
    onClick={handleDownload}
    className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white text-center rounded-full relative"
  >
    <span className="flex items-center">
      {loading ? (
        <CircularProgress size={22} color="inherit" className="mr-2 ml-2" />
      ) : (
        <>
          Download <DownloadIcon style={{ color: '#595959' }} className="ml-2" />
        </>
      )}
    </span>
    <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
  </button>
  <button
  className="px-4 py-2 backdrop-blur-sm border bg-pink-300/10 border-pink-500/20 text-white text-center rounded-full relative hover:bg-pink-500/30 hover:bg-gradient-to-r hover:from-pink-500/30 hover:to-rose-500/30 transition-all duration-300"
  onClick={handleFavt}
>
  <span className="flex items-center">
    {loading ? (
      <CircularProgress size={22} color="inherit" className="mr-2 ml-2" />
    ) : (
      <>
        {favtList[id] ? ( 
          // Render solid-filled FavoriteIcon if ID exists in favtList
          <FavoriteIcon style={{ color: '#FF6B6B' }} />
        ) : ( 
          // Render outlined FavoriteBorderIcon if ID doesn't exist in favtList
          <FavoriteBorderIcon style={{ color: '#FF6B6B' }} />
        )}
      </>
    )}
  </span>
  <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-pink-500 to-transparent" />
</button>

  <button
    onClick={handlePlay}
    className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white text-center rounded-full relative"
  >
    <span className="flex items-center">
      {loadingPlay ? (
        <CircularProgress size={22} color="inherit" className="mr-2 ml-2" />
      ) : (
        <>
          Play <PlayArrow style={{ color: '#595959' }} className="ml-2" /> {/* Use appropriate icon */}
        </>
      )}
    </span>
    <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
  </button>
</div>

 
  </div>
</CardSpotlight>

    );
  }

const Step = ({ title }: { title: string }) => {
  return (
    <li className="flex gap-2 items-start">
      <CheckIcon />
      <p className="text-white">{title}</p>
    </li>
  );
};

const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z"
        fill="currentColor"
        strokeWidth="0"
      />
    </svg>
  );
};
