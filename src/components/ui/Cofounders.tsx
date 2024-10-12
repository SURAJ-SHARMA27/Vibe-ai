import React from 'react'
import { AnimatedTooltip } from './animated-tooltip'
const people = [
  {
    id: 1,
    name: "Ka Ling Wu",
    designation: "Co-Founder",
    image:
      "/founder1.png",
  },
  {
    id: 2,
    name: "Serguei Balanovich",
    designation: "Co-Founder",
    image:
      "/founder2.png",

  },
    
  ];
const Cofounders = () => {
  return (
    <div className="bg-black height-[40rem] mt-40 relative w-full text-center">
    <h1 className="mt-30 mb-30 text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
      Meet our founders
    </h1>
    <div className="mt-20 flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={people} />
    </div>
  </div>
  
  )
}

export default Cofounders