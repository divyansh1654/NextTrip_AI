import React from "react";
import PlaceCardItem from "./PlaceCardItem";
import { Link } from "react-router-dom";

function PlacesToVisit({ trip }) {
  // Sort days correctly (Day1, Day2, ...)
  const sortedDays = Object.keys(trip?.tripData?.itinerary || {})
    .sort((a, b) => {
      const dayNumA = parseInt(a.replace("day", ""), 10);
      const dayNumB = parseInt(b.replace("day", ""), 10);
      return dayNumA - dayNumB;
    })
    .map((day) => ({
      key: day,
      data: trip.tripData.itinerary[day],
    }));

  return (
    <div>
      <h2 className="font-bold text-2xl text-center mt-5 mb-3">📍 Places to Visit</h2>

      {sortedDays.length > 0 ? (
        sortedDays.map(({ key, data }) => (
          <div key={key} className="mb-6">
            {/* Day Header */}
            <h2 className="font-semibold text-xl bg-gray-100 px-4 py-2 rounded-lg shadow-md">
              {key.toUpperCase()}
            </h2>
            <p className="text-gray-600 italic ml-2 mt-1">{data?.description}</p>

            {/* Grid Layout for Places */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
              {Array.isArray(data?.schedule) && data.schedule.length > 0 ? (
                data.schedule.map((place, index) => (
                    <Link to={"https://www.google.com/maps/search/?api=1&query="+place?.placeName+place?.latitude + place?.longitude } target='_blank'>
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-lg  hover:scale-105 transition-all cursor-pointer"
                  >
                    {/* Place Image */}
                    <PlaceCardItem place={place}/>

                    {/* Place Details */}
                    <div className="mt-3">
                      <h2 className="font-semibold text-lg">{place?.placeName}</h2>
                      <p className="text-gray-600 text-sm">{place?.placeDetails}</p>

                      {/* Best Time & Visit Time */}
                      <p className="text-sm mt-2">⏳ Best Time: {place?.bestTimeToVisit}</p>
                      <p className="text-sm">🕒 Visit Time: {place?.time}</p>
                      <p className="text-sm">🚗 Travel Time: {place?.travelTimeFromHotel}</p>

                      {/* Ticket Pricing */}
                      <div className="text-sm mt-2">
                        🎟️ Ticket Pricing:
                        <ul className="ml-4 list-disc text-gray-700">
                          <li>Adult: ₹{place?.ticketPricing?.adult || "Not Available"}</li>
                          <li>Child: ₹{place?.ticketPricing?.child || "Not Available"}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  </Link>
                ))
              ) : (
                <p className="text-gray-500">No places listed for this day.</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No itinerary available for this trip.</p>
      )}
    </div>
  );
}

export default PlacesToVisit;
