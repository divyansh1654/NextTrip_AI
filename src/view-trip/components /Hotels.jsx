import React from 'react'
import { Link } from 'react-router-dom'
import HotelCardItem from './HotelCardItem'

function Hotels({ trip }) {
  return (
    <div>
        <h2 className='font-bold text-xl mt-5 mb-5'>Hotel Recommendation</h2>
        
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {trip?.tripData?.hotelOptions?.length > 0 ? (
                trip.tripData.hotelOptions.map((hotel, index) => (
                   <HotelCardItem hotel={hotel}/>
                ))
            ) : (
                <p>No hotels available for this trip.</p> // Display this if no hotels are found
            )}
        </div>
    </div>
  )
}

export default Hotels
