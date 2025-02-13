import React from 'react'
import { Link } from 'react-router-dom'

function HotelCardItem({ hotel }) {
  return (
    <div>
        <Link to={"https://www.google.com/maps/search/?api=1&query=" + hotel?.hotelName + hotel?.hotelAddress} target='_blank'>
            {/* Use hotel.id as key instead of index */}
            <div key={hotel.id} className="border p-4 rounded-lg gap-6 hover:scale-105 transition-all cursor-pointer">
                <img 
                    src="/hotel.png" 
                    alt="Hotel" 
                    className='rounded-xl w-full h-48 object-cover' 
                />
                <div className='my-2'>
                    <h2 className='font-medium'>{hotel?.hotelName}</h2>
                    <h2 className='text-sm text-gray-500'>📍 {hotel?.hotelAddress}</h2>
                    <h2 className='text-sm'>{hotel?.averageNightly + " " + hotel?.currency}</h2>
                    <h2 className='text-sm'>⭐ {hotel?.rating + " stars"}</h2>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default HotelCardItem
