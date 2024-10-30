'use client';
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { logout } from "@/store/loginSlice";
import toast from "react-hot-toast";

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const isLoggedIn = useSelector((state: RootState) => state.login.isLoggedIn);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    toast.success("Logout Successful")
  };
  return (
<div
  className={cn("fixed top-10 z-50", className)}
  style={{ width: "20rem",margin:'0' }}
><Menu setActive={setActive}>
            <Link href="/">
              <MenuItem setActive={setActive} active={active} item='Home'>
              </MenuItem>
            </Link>

            <Link href={isLoggedIn ? "/favt" : "/"}>
            <MenuItem setActive={setActive} active={active} item='Favourites'>
                <div className="flex flex-col space-y-4 text-sm">
                  {isLoggedIn?(<HoveredLink href="/favt">Favourites</HoveredLink>):(<HoveredLink href="/"> Login first 👻</HoveredLink>)}
                </div>
              </MenuItem>
            </Link>

            <Link href="/" onClick={isLoggedIn ? handleLogout : undefined}>
            {isLoggedIn?(
              <MenuItem setActive={setActive} active={active} item='Logout'>
              
              </MenuItem>
            ):(
              <MenuItem setActive={setActive} active={active} item='Pricing'>
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/">Free? Just Kidding! 😂</HoveredLink>
              </div>
            </MenuItem>
            )}  
            </Link>
         
      </Menu>
    </div>
  );
}

export default Navbar;
