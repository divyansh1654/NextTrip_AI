import React, { useState, useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelersList,
} from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/AiModal";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { ImAirplane } from "react-icons/im";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { useNavigate } from "react-router-dom";
import Footer from "@/view-trip/components /Footer";
import "animate.css"; // Import Animate.css for animations

function CreateTrip() {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log("Updated Form Data:", formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Google Login Success:", tokenResponse);

      try {
        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v1/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        );

        console.log("User Profile:", userInfo.data);
        localStorage.setItem("user", JSON.stringify(userInfo.data));

        toast.success(`Welcome, ${userInfo.data.name}!`);
        setOpenDialog(false); // Close the dialog after successful login
        OnGenerateTrip(); // Automatically trigger trip generation after login
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    },
    onError: (error) => console.log("Login Error:", error),
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    console.log("User from localStorage:", user);

    // If no user is found in localStorage, show the login dialog
    if (!user) {
      console.log("User not found, opening login dialog...");
      setOpenDialog(true);
      return;
    }

    // Proceed only if all form fields are filled
    if (
      !formData?.noOfDays ||
      !formData?.location ||
      !formData?.budget ||
      !formData?.traveller
    ) {
      toast.error("Please fill all details!");
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log("AI Response:", await result?.response?.text());
      toast.success("Trip generated successfully!");
      setLoading(false);
      SaveAiTrip(result?.response?.text());
    } catch (error) {
      console.error("Error generating trip:", error);
      toast.error("Failed to generate trip. Please try again.");
    }
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate("/view-trip/" + docId);
  };

  return (
    <div className="relative flex flex-col items-center gap-9 mt-16 px-4 overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-[#f56551]/10 to-[#dd6b20]/10"></div>
        <div className='absolute inset-0 bg-[url("../assets/travel-pattern.png")] opacity-10'></div>
      </div>

      <div
        style={{
          background:
            "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(236,53,15,1) 57%, rgba(255,143,0,1) 100%)",
        }}
        className="text-white mb-10 p-6"
      >
        <h2 className="font-bold text-4xl mb-3 text-shadow-md animate__animated animate__fadeIn animate__delay-1s">
          Tell us your travel preferences
        </h2>
        <p className="text-xl text-gray-100 tracking-wide leading-relaxed animate__animated animate__fadeIn animate__delay-2s">
          Just provide some basic information, and our trip planner will
          generate a customized itinerary based on your preferences.
        </p>
      </div>

      <div className="mt-20 space-y-10">
        {/* Destination Input */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 relative z-10">
          <h2 className="text-xl mb-3 font-medium text-gray-700">
            What is your destination?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              value: place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
              className: "w-full",
              styles: {
                control: (provided) => ({
                  ...provided,
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "none",
                  "&:hover": {
                    borderColor: "#a0aec0",
                  },
                }),
              },
            }}
          />
        </div>

        {/* Number of Days Input */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
          <h2 className="text-xl mb-3 font-medium text-gray-700 text-gradient hover:text-blue-600 animate__animated animate__fadeIn">
            How many days are you staying?
          </h2>
          <Input
            placeholder="Ex. 3"
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
          />
        </div>

        {/* Budget Selection */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
          <h2 className="text-xl mb-3 font-medium text-gray-700 text-gradient hover:text-blue-600 animate__animated animate__fadeIn">
            What is Your Budget?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-6 border cursor-pointer rounded-lg hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105
                  ${
                    formData?.budget === item.title
                      ? "border-blue-500 shadow-lg bg-blue-50"
                      : "border-gray-200 bg-white"
                  }`}
              >
                <h2 className="text-4xl mb-2 text-blue-600 animate__animated animate__fadeIn">
                  {item.icon}
                </h2>
                <h2 className="font-bold text-lg text-gray-800">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Travelers Selection */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
          <h2 className="text-xl mb-3 font-medium text-gray-700 text-gradient hover:text-blue-600 animate__animated animate__fadeIn">
            Who do you plan on traveling with on your next adventure?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
            {SelectTravelersList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("traveller", item.people)}
                className={`p-6 border cursor-pointer rounded-lg hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105
                  ${
                    formData?.traveller === item.people
                      ? "border-blue-500 shadow-lg bg-blue-50"
                      : "border-gray-200 bg-white"
                  }`}
              >
                <h2 className="text-4xl mb-2 text-blue-600 animate__animated animate__fadeIn">
                  {item.icon}
                </h2>
                <h2 className="font-bold text-lg text-gray-800">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Generate Trip Button */}
        <div className="my-20 flex justify-end animate__animated animate__fadeIn animate__delay-3s">
          <Button
            disabled={loading}
            className="bg-gradient-to-r from-[#020024] to-[#ff8f00] text-white font-semibold py-3 px-8 rounded-lg transition duration-200 transform hover:scale-105"
            onClick={OnGenerateTrip}
          >
            {loading ? (
              <ImAirplane className="h-7 w-7 animate-spin" />
            ) : (
              "Generate Trip"
            )}
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default CreateTrip;
