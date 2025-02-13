import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import { toast } from "react-hot-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";

function Header() {
  const [user, setUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Google Login Success:", tokenResponse);

      try {
        const userInfo = await axios.get("https://www.googleapis.com/oauth2/v1/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });

        console.log("User Profile:", userInfo.data);
        localStorage.setItem("user", JSON.stringify(userInfo.data));
        setUser(userInfo.data);

        toast.success(`Welcome, ${userInfo.data.name}!`);
        setOpenDialog(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast.error("Failed to fetch user details");
      }
    },
    onError: (error) => {
      console.log("Login Error:", error);
      toast.error("Google login failed");
    },
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully");
  };

  return (
    <div className="p-5 shadow-xl flex justify-between items-center px-10 bg-gradient-to-r from-blue-200 via-indigo-300 to-purple-400 rounded-lg transition-all duration-500 ease-in-out transform hover:scale-105">
      {/* Logo with hover effect */}
      <a href="/" className="transition-transform transform hover:scale-110 duration-300">
        <img src="/logo.svg" alt="Logo" className="w-16 h-16" />
      </a>

      {/* Project Name with new gradient */}
      <div className="flex flex-col justify-center items-center space-y-2">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#020024] to-[#ff8f00] ">
          NextTripAI
        </h1>
        <span className="text-lg bg-clip-text bg-gradient-to-r from-[#020024] to-[#ff8f00] ">Your AI-powered Trip Planner</span>
      </div>

      {/* User Authentication or Profile Section */}
      <div className="flex items-center gap-6">
        {user ? (
          <div className="flex gap-3 items-center">
            <a href="/create-trip">
              <Button variant="outline" className="rounded-full text-white  bg-gradient-to-r from-[#020024] to-[#ff8f00] hover:bg-gradient-to-l hover:scale-105 hover:shadow-lg transition-all duration-300">
                +Create Trip
              </Button>
            </a>
            <a href="/my-trips">
            <Button variant="outline" className="rounded-full text-white  bg-gradient-to-r from-[#020024] to-[#ff8f00] hover:bg-gradient-to-l hover:scale-105 hover:shadow-lg transition-all duration-300">
            My Trips
              </Button>
            </a>

            {/* User Profile Picture & Popover for Logout */}
            <Popover>
              <PopoverTrigger>
                <img 
                  src={user.picture ? `${user.picture}?sz=100` : "/default-profile.png"} 
                  className="h-[40px] w-[40px] rounded-full cursor-pointer transform transition duration-300 hover:scale-110"
                  alt="User"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2 
                  className="cursor-pointer text-red-600 hover:underline transition duration-200"
                  onClick={handleLogout}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>

            {/* Display User Email with Fade In Animation */}
            <span className="text-white opacity-90 hover:opacity-100 transition duration-200">{user.email || "No Email"}</span>
          </div>
        ) : (
          <Button 
            onClick={() => setOpenDialog(true)} 
            className="bg-gradient-to-r from-purple-400 to-pink-500 text-white hover:bg-gradient-to-l hover:scale-105 transition duration-300 transform"
          >
            Sign in
          </Button>
        )}
      </div>

      {/* Google Login Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-gradient-to-r from-teal-300 to-cyan-400 rounded-lg p-6">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-semibold text-white">Sign In With Google</DialogTitle>
            <DialogDescription className="text-center text-white mb-4">
              <img src="/logo.svg" alt="App Logo" className="mx-auto w-16 h-16 mb-4" />
              <span>Sign in to the App with Google authentication</span>
            </DialogDescription>
          </DialogHeader>
          <Button 
            onClick={login} 
            className="w-full mt-5 flex gap-4 items-center justify-center bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-full hover:bg-gradient-to-l hover:scale-105 transition duration-200 transform"
          >
            <FcGoogle className="h-7 w-7" />
            Sign In With Google
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
