import React from 'react';

function PlaceCardItem({ place }) {
  // Array of image filenames
  const images = [
    '/images/s1.png', // Replace with your image filenames
    '/images/s2.png',
    '/images/s3.png',
    '/images/s4.png'
  ];

  // Function to get a random image from the array
  const randomImage = images[Math.floor(Math.random() * images.length)];

  return (
    <div>
      {/* Display random image */}
      <img
        src={randomImage}
        alt="Place"
        className="rounded-xl w-full h-48 object-cover"
      />
    </div>
  );
}

export default PlaceCardItem;
