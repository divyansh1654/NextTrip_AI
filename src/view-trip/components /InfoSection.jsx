import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { FaPaperPlane } from 'react-icons/fa6';

function InfoSection({ trip }) {
    const [placePhoto, setPlacePhoto] = useState('');
    const [loading, setLoading] = useState(false); // To show loading indicator during API call
    const [error, setError] = useState(null); // To handle errors

    useEffect(() => {
        if (trip?.userSelection?.location?.label) {
            fetchUnsplashImage(trip.userSelection.location.label); // Fetch image based on location
        }
    }, [trip]);

    const fetchUnsplashImage = async (locationLabel) => {
        setLoading(true);
        setError(null);

        try {
            const unsplashAPIKey = import.meta.env.VITE_UNSPLASH_API_KEY; // Make sure to store API key in .env
            const response = await fetch(`https://api.unsplash.com/search/photos?query=${locationLabel}&client_id=${unsplashAPIKey}`);
            const data = await response.json();
            
            if (data.results && data.results.length > 0) {
                setPlacePhoto(data.results[0].urls.regular); // Use the first image from the search results
            } else {
                setPlacePhoto('/pictra.jpg'); // Default image if no photo is found
            }
        } catch (err) {
            setError('Error fetching image from Unsplash.');
            console.error('Error fetching Unsplash image:', err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {loading ? (
                <div className="text-center py-10">Loading...</div> // Show loading text or spinner
            ) : (
                <>
                    {/* Show place photo or default image */}
                    <img
                        src={placePhoto || '/pictra.jpg'}
                        alt="Trip Location"
                        className="h-[340px] w-full object-cover rounded-xl"
                    />
                </>
            )}

            {error && <div className="text-red-500 text-center">{error}</div>} {/* Show error message */}

            <div className="flex justify-between items-center">
                <div className="my-5 flex flex-col gap-2">
                    <h2 className="font-bold text-2xl">{trip?.userSelection?.location?.label}</h2>
                    <div className="flex gap-5">
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
                            📅 {trip?.userSelection?.noOfDays} Day(s)
                        </h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
                            💸 {trip?.userSelection?.budget} Budget
                        </h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
                            🧑‍🤝‍🧑 {trip?.userSelection?.traveller} Travelers
                        </h2>
                    </div>
                </div>
                <Button>
                    <FaPaperPlane />
                </Button>
            </div>
        </div>
    );
}

export default InfoSection;
