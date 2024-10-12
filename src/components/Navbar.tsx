'use client';
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);

  return (
    <div
    className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
  >
    <Menu setActive={setActive}>
        <Link href={"/"}>
        <MenuItem setActive={setActive} active={active} item='Home'>
        <div className="flex flex-col space-y-4 text-sm">
        <HoveredLink href="/">No Home 😂</HoveredLink>
        

        </div>
         </MenuItem>
        </Link>
        <MenuItem setActive={setActive} active={active} item='About'>
        <div className="flex flex-col space-y-4 text-sm">
        <HoveredLink href="/"> Why So Curious? 🧐</HoveredLink>

        </div>

         </MenuItem>
         <MenuItem setActive={setActive} active={active} item='Services'>
        <div className="flex flex-col space-y-4 text-sm">
        <HoveredLink href="/">Magic Happens Here ✨</HoveredLink>
       

        


        </div>

         </MenuItem>
         <Link href={"/"}>
        <MenuItem setActive={setActive} active={active} item='Tools'>
        <div className="flex flex-col space-y-4 text-sm">
        <HoveredLink href="/">Tools? What Tools? 🤔</HoveredLink>
     

        </div>
         </MenuItem>
      
        </Link>
        <Link href={"/"}>
        <MenuItem setActive={setActive} active={active} item='Pricing'>
        
        <div className="flex flex-col space-y-4 text-sm">
        <HoveredLink href="/">Free? Just Kidding! 😂</HoveredLink>
     

        </div>
         </MenuItem>
        </Link>
       
        </Menu>        
        </div>
  )
}

export default Navbar