"use client";
import React, { useState } from "react";
import { Label } from "./label";
import { Input } from "./input";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";  // Import the toast
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { login } from "@/store/loginSlice";
import { ForgotPassword } from "./ForgotPassword";

interface LoginForm {
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
}

export function LoginForm({ showLoginModal, setShowLoginModal }: LoginForm) {
  const isLoggedIn = useSelector((state: RootState) => state.login.isLoggedIn);
  const token = useSelector((state: RootState) => state.login.token);
  const [showForgotModal, setShowForgotModal]=useState(false);
  const dispatch = useDispatch<AppDispatch>();

   const [formData, setFormData] = useState({

    email: "",
    password: "",
  });

  const initialFormData = {
    email: "",
    password: "",
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleForgotModal=()=>{
    setShowForgotModal(true);
    setShowLoginModal(false);
    setFormData(initialFormData);
  }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    
    
      // Use toast.promise to handle the async fetch call
      toast.promise(
        new Promise(async (resolve, reject) => {
          try {
            const response = await fetch("/backend-api/api/user/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            });
    
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
    
            const data = await response.json();
            dispatch(login(data.token));
            localStorage.setItem('firstName',data.firstName)
            // Close modal and reset form on success
            setShowLoginModal(false);
            setFormData(initialFormData);
    
            resolve(data); // Resolve promise on success
          } catch (error) {
            console.error("Error during signup:", error);
            setFormData(initialFormData);
            reject(error); // Reject promise on failure
          }
        }).then((data:any) => {
          // Access the firstName from the resolved data here
          return `Welcome Back ${data.firstName}`;
        }),
        {
          loading: "Processing signup...",
          success: (message) => message,  // Use the resolved message from the Promise
          error: "Signup failed. Please try again.",
        }
      );
    };
  
  const closeModal = () => {
    setShowLoginModal(false);
    setFormData(initialFormData);
  };

  return (
    <>
      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ zIndex: 9998 }}>
          <div className="absolute inset-0 bg-black bg-opacity-70" />
          <div className="relative max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
              Welcome Back to Vibe AI
            </h2>
            <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
              Log in to Vibe AI if you want to save songs to your favorites list and share tracks.
            </p>

            <form className="my-8" onSubmit={handleSubmit}>
            
              <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  name="email"
                  placeholder="honeypaaji@fc.com" 
                  type="email" 
                  value={formData.email}
                  onChange={handleChange} 
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  name="password"
                  placeholder="••••••••" 
                  type="password" 
                  value={formData.password}
                  onChange={handleChange} 
                />
              </LabelInputContainer>
        
              <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
              >
                Log In &rarr;
                <BottomGradient />
              </button>
               <p style={{fontSize:"14px",float:"right",cursor:"pointer",color:"white"}} onClick={handleForgotModal} className="mt-2 mb-2">Forgot Password</p>
              <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
            </form>

            <button
              className="absolute top-2 right-2 text-neutral-600 dark:text-neutral-400"
              onClick={closeModal}
            >
              X {/* Close modal button */}
            </button>
          </div>
        </div>
      )}
              <ForgotPassword showForgotModal={showForgotModal} setShowForgotModal={setShowForgotModal}/>

    </>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
