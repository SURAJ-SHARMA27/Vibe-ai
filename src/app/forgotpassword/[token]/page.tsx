import Navbar from "@/components/Navbar";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { CardSpotlightDemo } from "@/components/ui/Card-spot";
import Cofounders from "@/components/ui/Cofounders";
import { Cover } from "@/components/ui/cover";
import { ExpandableCardDemo } from "@/components/ui/ExpandableCardDemo";
import FavtSection from "@/components/ui/FavtSection";
import { Features } from "@/components/ui/Features";
import { ForgotForm } from "@/components/ui/ForgotForm";
import { LoginForm } from "@/components/ui/LoginForm";
import { Meteors } from "@/components/ui/meteors";
import { WavyBackground } from "@/components/ui/wavy-background";
import Image from "next/image";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

const page = () => {
  return (
    <>
      <div className="relative w-full flex items-center justify-center" style={{ zIndex: 9997 }}>
            <Navbar />
          </div>
    <div className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
            <Toaster
            toastOptions={{
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff'
              },}}
            />
            <ForgotForm/>
{/* <ExpandableCardDemo/> */}
 
   
              
      {/* <div className="bg-black height-[40rem] mt-40 relative w-full text-center">
    <h1 className="mt-30 mb-30 text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
      Meet our founders
    </h1>
    <div className="mt-20 flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={people} />
    </div>
  </div> */}
  
    <div className="flex flex-col md:flex-row justify-center items-center px-4 space-y-6 md:space-y-0 md:space-x-6 mt-20">
  {/* Card 1 */}
  <div className="w-full relative max-w-xs h-92"> {/* Set a fixed height */}
    <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] rounded-full blur-3xl" />
    <div className="relative shadow-xl bg-gray-900 border border-gray-800 px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
      <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-2 w-2 text-gray-300"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
          />
        </svg>
      </div>

      <h1 className="font-bold text-xl text-white mb-4 relative z-50">
      Enjoying the App? 🌟
</h1>

<p className="font-normal text-base text-slate-500 mb-4 relative z-50">
If you liked this app, don’t forget to star the repository on GitHub! It helps others discover the project and motivates me to keep improving it.
  </p>


      <button className="border px-4 py-1 rounded-lg border-gray-500 text-gray-300">
      <a
      href="https://github.com/SURAJ-SHARMA27/Vibe-ai" // Replace with your GitHub repo URL
      target="_blank"
      rel="noopener noreferrer"
    >
      ⭐ Star this Repo
    </a>
      </button>

      {/* Meteor effect */}
      <Meteors number={20} />
    </div>
  </div>
  {/* Card 2 - Different content */}
  <div className="w-full relative max-w-xs h-92"> {/* Set a fixed height */}
    <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-purple-500 to-pink-500 transform scale-[0.80] rounded-full blur-3xl" />
    <div className="relative shadow-xl bg-gray-900 border border-gray-800 px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
      <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-2 w-2 text-gray-300"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
          />
        </svg>
      </div>

      <h1 className="font-bold text-xl text-white mb-4 relative z-50">
      Follow Me Online 🚀
</h1>

<p className="font-normal text-base text-slate-500 mb-4 relative z-50">
Stay updated with my latest projects. This is just the basic version—stay tuned for the bang version!
</p>


<div className="flex mt-4 space-x-4">
      <a
        href="https://www.linkedin.com/in/suraj-sharma-239894223/" // Replace with your LinkedIn URL
        className="px-4 py-2 bg-gray-800 text-white rounded-full"
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </a>
      <a
        href="https://github.com/SURAJ-SHARMA27" // Replace with your GitHub URL
        className="px-4 py-2 bg-gray-800 text-white rounded-full"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
      <a
        href="https://suraj-sharma-27.netlify.app/" // Replace with your GitHub URL
        className="px-4 py-2 bg-gray-800 text-white rounded-full"
        target="_blank"
        rel="noopener noreferrer"
      >
        Portfolio
      </a>
    </div>
      {/* Meteor effect */}
      <Meteors number={20} />
    </div>
  </div>
</div>

    

<footer className="w-full flex items-center justify-center py-3 mb-4 mt-20">
        <Link
          className="flex items-center gap-1 text-current"
          href="https://www.linkedin.com/in/suraj-sharma-239894223/"
          title="Suraj's LinkedIn"
        >
          <span className="text-default-600">Designed & built by</span>
          <p className="text-primary">Suraj Sharma</p>
        </Link>
      </footer>

    </div>
    </>
  )
}

export default page