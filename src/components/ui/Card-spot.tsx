"use client";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { CircularProgress } from "@mui/material";
import axios from 'axios';
import { useState } from "react";
import DownloadIcon from '@mui/icons-material/Download';
interface CardSpotlightDemoProps {
    title: string;       // Title prop
    description: string; // Description prop
    year: any;      // Footer prop
    url:any;
    mpUrl:any;
  }
  
  export function CardSpotlightDemo({ title, description, year,url,mpUrl }: CardSpotlightDemoProps) {

    // import { saveAs } from 'file-saver';
    const [loading, setLoading] = useState(false); 
 
    const handleDownload = async () => {
      setLoading(true);
      try {
        const encodedUrl = encodeURIComponent(mpUrl);
        const apiUrl = `/api/api.php?__call=song.generateAuthToken&url=${encodedUrl}&bitrate=128&api_version=4&_format=json&ctx=web6dot0&_marker=0`;
    
        // Fetching download URL  
        const response = await axios.get(apiUrl);
        const downloadUrl = response.data.auth_url;
        console.log(downloadUrl, "do3n");
    
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
    
    


    return (
<CardSpotlight className="h-[28rem] w-96">
  {/* Image at the top */}
  <div className="flex justify-center mt-4">
    <img
      src={url}
      alt={title}
      style={{ zIndex: 9998 }}
      className="w-24 h-24 object-cover rounded-full border-2 border-white" // Add border for better visibility
    />
  </div>

  {/* Overlay effect for better text readability */}
  <div className="absolute inset-0 bg-black opacity-30 rounded-t-lg"></div>

  <div className="p-4 relative z-10 flex flex-col items-center justify-center h-full">
    {/* Title */}
    <p className="text-xl font-bold text-white text-center">{title}</p>

    {/* Description */}
    <div className="text-neutral-200 mt-2 text-center"> {/* Center align the description */}
      {description}
    </div>

    {/* Year */}
    <p className="text-neutral-300 mt-4 text-sm text-center">{year}</p>
    <button           onClick={handleDownload}
 className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
      <span className="flex items-center">
  {loading ? (
    <CircularProgress size={22} color="inherit" className="mr-2 ml-2" />
  ) : (
    <>
      Download <DownloadIcon style={{color: '#595959'}} className="ml-2" />
    </>
  )}
</span>


          <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </button>
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
