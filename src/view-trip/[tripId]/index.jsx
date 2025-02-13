import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import InfoSection from '../components /infoSection';
import Hotels from '../components /Hotels';
import PlacesToVisit from '../components /PlacesToVisit';
import Footer from '../components /Footer';

function Viewtrip() {
  
    const {tripId} = useParams();
    const [trip, setTrip]=useState([]);

        useEffect(()=>{
            tripId&&GetTripData();
        },[tripId])

        const GetTripData=async()=>{
            const docRef=doc(db, 'AITrips', tripId);
            const docSnap=await getDoc(docRef) ;

            if(docSnap.exists()){
            console.log("Dodcument:",docSnap.data());
            setTrip(docSnap.data ());
            }
            else{
            console.log("No Such Document");
            toast('No trip Found!');
        }}



    return (
        <div className= 'p-10 md:px-20 lg:px-44'>
        {/* Background Effect */}
        <div className='absolute inset-0 -z-10'>
            <div className='absolute inset-0 bg-gradient-to-r from-[#f56551]/10 to-[#dd6b20]/10'></div>
            <div className='absolute inset-0 bg-[url("../assets/travel-pattern.png")] opacity-10'></div>
        </div>
        {/* Information Section*/}
            <InfoSection trip={trip}/>
        {/* Hotels Section*/}
            <Hotels trip={trip}/>
            
        {/* PlacesToVisit Section*/}
            <PlacesToVisit trip={trip}/>
            {/* Background Effect */}
        <div className='absolute inset-0 -z-10'>
            <div className='absolute inset-0 bg-gradient-to-r from-[#f56551]/10 to-[#dd6b20]/10'></div>
            <div className='absolute inset-0 bg-[url("../assets/travel-pattern.png")] opacity-10'></div>
        </div>
        {/* Footer Section*/}
            <Footer trip={trip}/>
        </div>
    )
}

export default Viewtrip