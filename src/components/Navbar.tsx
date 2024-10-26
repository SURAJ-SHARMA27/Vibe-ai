'use client';
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { logout } from "@/store/loginSlice";

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const isLoggedIn = useSelector((state: RootState) => state.login.isLoggedIn);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
  };
  return (
    <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
      <Menu setActive={setActive}>
        {isLoggedIn ? (
          <>
            <Link href="/">
              <MenuItem setActive={setActive} active={active} item='Home'>
              </MenuItem>
            </Link>

            <Link href="/favt">
              <MenuItem setActive={setActive} active={active} item='Favourites'>
                <div className="flex flex-col space-y-4 text-sm">
                  <HoveredLink href="/favt">Favourites</HoveredLink>
                </div>
              </MenuItem>
            </Link>

            <Link href="/" onClick={handleLogout}>
              <MenuItem setActive={setActive} active={active} item='Logout'>
              
              </MenuItem>
            </Link>
          </>
        ) : (
          <>
            {/* Dummy navbar items displayed when not logged in */}
            <Link href="/">
              <MenuItem setActive={setActive} active={active} item='About'>
                <div className="flex flex-col space-y-4 text-sm">
                  <HoveredLink href="/"> Why So Curious? 🧐</HoveredLink>
                </div>
              </MenuItem>
            </Link>
            <MenuItem setActive={setActive} active={active} item='Services'>
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/">Magic Happens Here ✨</HoveredLink>
              </div>
            </MenuItem>
            <Link href="/">
              <MenuItem setActive={setActive} active={active} item='Tools'>
                <div className="flex flex-col space-y-4 text-sm">
                  <HoveredLink href="/">Tools? What Tools? 🤔</HoveredLink>
                </div>
              </MenuItem>
            </Link>
            <Link href="/">
              <MenuItem setActive={setActive} active={active} item='Pricing'>
                <div className="flex flex-col space-y-4 text-sm">
                  <HoveredLink href="/">Free? Just Kidding! 😂</HoveredLink>
                </div>
              </MenuItem>
            </Link>
          </>
        )}
      </Menu>
    </div>
  );
}

export default Navbar;
