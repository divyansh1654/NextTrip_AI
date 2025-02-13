import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

// Import images (replace with your actual image paths)
import travelImage1 from "../../assets/p1.png"; // Example: AI planning a trip
import travelImage2 from "../../assets/p2.png"; // Example: Beautiful destination
import travelImage3 from "../../assets/p3.png"; // Example: Adventure tourism
import aiImage from "../../assets/p4.png"; // Example: AI technology
import Footer from '@/view-trip/components /Footer';

function Hero() {
    const {tripId} = useParams();
    const [trip, setTrip]=useState([]);
  return (
    <div className='relative flex flex-col items-center gap-9 mt-16 px-4 overflow-hidden'>
      {/* Background Effect */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute inset-0 bg-gradient-to-r from-[#f56551]/10 to-[#dd6b20]/10'></div>
        <div className='absolute inset-0 bg-[url("../assets/travel-pattern.png")] opacity-10'></div>
      </div>

      {/* Main Header with Animation */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className='font-extrabold text-[50px] text-center text-transparent bg-clip-text bg-gradient-to-r from-[#f56551] to-[#dd6b20] animate-text'
      >
        Discover Your Next Adventure with AI:<br />
        Personalized Itineraries at Your Fingertips
      </motion.h1>

      {/* Subheading with Fade-In Animation */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className='text-xl text-gray-500 text-center max-w-2xl mx-auto'
      >
        Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
      </motion.p>

      {/* Application Description with Staggered Animations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className='text-lg text-gray-600 text-center mt-8 max-w-3xl mx-auto'
      >
        {/* What is AI Trip Planner */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className='bg-gradient-to-r from-gray-200 to-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'
        >
          <div className='flex flex-col md:flex-row items-center gap-6'>
            <img
              src={aiImage}
              alt='AI Trip Planner'
              className='w-full md:w-1/2 rounded-lg shadow-md'
            />
            <div>
              <p className='text-2xl font-semibold text-[#f56551]'>What is AI Trip Planner?</p>
              <p className='mt-4'>
                AI Trip Planner is your <strong>personalized travel assistant</strong>, leveraging artificial intelligence to <strong>design custom itineraries</strong> tailored to your interests, budget, and time constraints. Whether you're a solo traveler, a couple on a romantic getaway, or a group of friends planning an adventure, our smart system ensures you <strong>experience the best destinations effortlessly.</strong>
              </p>
            </div>
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className='mt-8 bg-gradient-to-r from-gray-200 to-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'
        >
          <p className='text-2xl font-semibold text-[#f56551]'>How It Works?</p>
          <div className='flex flex-col md:flex-row items-center gap-6 mt-4'>
            <ul className='list-disc pl-8'>
              <li><strong>Tell Us Your Preferences</strong> – Select your destination, travel dates, budget, and interests.</li>
              <li><strong>AI Generates an Itinerary</strong> – Our intelligent system curates the best places, accommodations, and experiences for you.</li>
              <li><strong>Customize & Save</strong> – Modify your trip, save it, or share it with your travel companions.</li>
              <li><strong>Get Real-Time Updates</strong> – Receive weather forecasts, transport suggestions, and exclusive travel tips.</li>
            </ul>
            <img
              src={travelImage1}
              alt='How It Works'
              className='w-full md:w-1/2 rounded-lg shadow-md'
            />
          </div>
        </motion.div>

        {/* Why Choose */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className='mt-8 bg-gradient-to-r from-gray-200 to-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'
        >
          <p className='text-2xl font-semibold text-[#f56551]'>Why Choose AI Trip Planner?</p>
          <div className='flex flex-col md:flex-row items-center gap-6 mt-4'>
            <img
              src={travelImage2}
              alt='Why Choose Us'
              className='w-full md:w-1/2 rounded-lg shadow-md'
            />
            <ul className='list-disc pl-8'>
              <li><strong>Personalized Trips</strong> – No generic itineraries! Get plans that match your style.</li>
              <li><strong>Saves Time & Effort</strong> – No more endless research. Get your trip plan in seconds.</li>
              <li><strong>Smart Budgeting</strong> – Optimize your trip without breaking the bank.</li>
              <li><strong>AI-Powered Recommendations</strong> – Discover hidden gems and local favorites.</li>
              <li><strong>Seamless Experience</strong> – User-friendly interface with easy modifications.</li>
            </ul>
          </div>
        </motion.div>

        {/* Inspirational Quotes */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className='mt-8 bg-gradient-to-r from-gray-200 to-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'
        >
          <p className='text-2xl font-semibold text-[#f56551]'>Quotes to Inspire Your Next Adventure:</p>
          <div className='flex flex-col md:flex-row items-center gap-6 mt-4'>
            <ul className='list-none'>
              <li>"Travel is the only thing you buy that makes you richer." – Anonymous</li>
              <li>"The world is a book, and those who do not travel read only one page." – Saint Augustine</li>
              <li>"Let AI handle the planning, so you can focus on making memories." – AI Trip Planner</li>
            </ul>
            <img
              src={travelImage3}
              alt='Inspirational Quotes'
              className='w-full md:w-1/2 rounded-lg shadow-md'
            />
          </div>
        </motion.div>

        <div className='mt-8'>
          <strong className='text-xl'>Ready to travel smarter?</strong> Click below to begin your journey!
        </div>
      </motion.div>

      {/* Get Started Button with Hover Animation */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link to={'/create-trip'}>
          <Button className='mt-8 px-6 py-3 text-lg bg-gradient-to-r from-[#f56551] to-[#dd6b20] hover:from-[#dd6b20] hover:to-[#f56551] rounded-xl text-white font-bold shadow-lg transform transition-all duration-300'>
            Get Started. It's Free
          </Button>
        </Link>
      </motion.div>
     {/* Footer Section*/}
     <Footer trip={trip}/>
    </div>
  );
}

export default Hero;