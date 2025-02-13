export const SelectTravelersList = [
    {
        id: 1, 
        title: 'Just Me',
        desc: 'A solo traveler in exploration',
        icon: '🧍', // Single person emoji
        people: '1'
    },
    {
        id: 2, 
        title: 'Couple',
        desc: '2 travelers in tandem',
        icon: '❤️', // Heart emoji for couples
        people: '2'
    },
    {
        id: 3, 
        title: 'Family',
        desc: 'Traveling with family members',
        icon: '👨‍👩‍👧‍👦', // Family emoji
        people: '3+'
    },
    {
        id: 4, 
        title: 'Freinds',
        desc: 'Traveling with buddies',
        icon: '♾️🫂❤️', // Family emoji
        people: '4+'
    }
];

export const SelectBudgetOptions = [
    {
        id: 1, 
        title: 'Economy',
        desc: 'Stay conscious of costs',
        icon: '💰' // Money bag emoji for budget travel
    },
    {
        id: 2, 
        title: 'Moderate',
        desc: 'Keep costs on the average side',
        icon: '💳' // Credit card emoji for moderate spending
    },
    {
        id: 3, 
        title: 'Luxury',
        desc: 'Enjoy a premium travel experience',
        icon: '🏨' // Hotel emoji for luxury travel
    }
];


export const AI_PROMPT="Generate Travel Plan for Location : {location},for {totalDays} Days for {traveler} with a {budget} budget, give me Hotels options list with HotelName, Hotel address,Price, Hotel image url, geo coordinates,rating,descriptions and suggest itinerary with placeName , Place Details , Place Image url, Geo Coordinates, ticket Pricing, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format";   