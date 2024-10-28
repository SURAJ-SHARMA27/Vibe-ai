"use client";
import React, { useState } from "react";
import { Label } from "./label";
import { Input } from "./input";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";  // Import the toast
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { login } from "@/store/loginSlice";

interface ForgotPassword {
  showForgotModal: boolean;
  setShowForgotModal: (show: boolean) => void;
}

export function ForgotPassword({ showForgotModal, setShowForgotModal }: ForgotPassword) {
  const isLoggedIn = useSelector((state: RootState) => state.login.isLoggedIn);
  const token = useSelector((state: RootState) => state.login.token);

  const dispatch = useDispatch<AppDispatch>();

   const [formData, setFormData] = useState({

    email: "",
  });

  const initialFormData = {
    email: "",
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    
    
      // Use toast.promise to handle the async fetch call
      toast.promise(
        new Promise(async (resolve, reject) => {
          try {
            const response = await fetch("/backend-api/forgetpassword", {
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
          
            setShowForgotModal(false);
            setFormData(initialFormData);
    
            resolve(data); // Resolve promise on success
          } catch (error) {
            console.error("Error during reset:", error);
            setFormData(initialFormData);
            reject(error); // Reject promise on failure
          }
        }).then((data:any) => {
          // Access the firstName from the resolved data here
          return `Reset link sent successfully`;
        }),
        {
          loading: "Sending reset link...",
          success: (message) => message,  // Use the resolved message from the Promise
          error: "Reset failed. Please try again.",
        }
      );
    };
  
  const closeModal = () => {
    setShowForgotModal(false);
    setFormData(initialFormData);
  };

  return (
    <>
      {showForgotModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ zIndex: 9998 }}>
          <div className="absolute inset-0 bg-black bg-opacity-70" />
          <div className="relative max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Why don't you remember it
            </h2>
            <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            because your password is probably buried deep in the same place as your hopes. Revive both and move on.
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
            
        
              <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
              >
                Send Reset Link &rarr;
                <BottomGradient />
              </button>

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
