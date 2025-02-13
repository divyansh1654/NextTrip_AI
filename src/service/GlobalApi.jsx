import axios from "axios";

const BASE_URL = 'https://places.googleapis.com/v1/places:searchText';

const config = {
    headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
        'X-Goog-FieldMask': 'places.photos,places.displayName,places.id'
    }
};

// Ensure BASE_URL is accessible when calling axios
export const GetPlaceDetails = (data) => {
    console.log("BASE_URL:", BASE_URL); // Debugging line
    return axios.post(BASE_URL, data, config);
};
