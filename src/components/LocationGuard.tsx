import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, ShieldAlert, Globe } from 'lucide-react';
import { PAKISTAN_BOUNDS } from '../constants';
import { GeolocationStatus } from '../types';

interface LocationGuardProps {
  children: React.ReactNode;
}

export default function LocationGuard({ children }: LocationGuardProps) {
  const [status, setStatus] = useState<GeolocationStatus>('loading');
  const [isBlockedRegion, setIsBlockedRegion] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus('denied');
      setError('Geolocation is not supported by your browser.');
      return;
    }

    const fetchIpLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const countryCode = data.country_code;
        
        if (countryCode === 'PK') {
          setIsBlockedRegion(true);
        } else {
          setIsBlockedRegion(false);
          setStatus('granted');
        }
      } catch (err) {
        console.error("IP Location fallback failed:", err);
        setStatus('denied');
        setError('Could not verify location via IP.');
      }
    };

    const checkLocation = () => {
      const options: PositionOptions = {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          console.log(`Location detected: ${latitude}, ${longitude} (Accuracy: ${accuracy}m)`);
          
          const inPakistan = 
            latitude >= PAKISTAN_BOUNDS.south && 
            latitude <= PAKISTAN_BOUNDS.north && 
            longitude >= PAKISTAN_BOUNDS.west && 
            longitude <= PAKISTAN_BOUNDS.east;
          
          setIsBlockedRegion(inPakistan);
          setStatus('granted');
        },
        (err) => {
          console.error("Geolocation error:", err.message);
          // Fallback to IP matching if user denied or it failed
          fetchIpLocation();
        },
        options
      );
    };

    checkLocation();
  }, []);

  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-charcoal text-white p-6 text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="mb-4"
        >
          <Globe className="w-12 h-12 text-saffron" />
        </motion.div>
        <h1 className="text-2xl font-display uppercase tracking-widest mb-2">Verifying Location</h1>
        <p className="text-ash/60 font-accent">ThikThak is available globally. Please wait while we verify your region.</p>
      </div>
    );
  }

  if (status === 'denied' || isBlockedRegion) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-charcoal text-white p-6 text-center">
        <div className="mb-6 p-4 bg-saffron/10 border-2 border-saffron rounded-full">
          <ShieldAlert className="w-16 h-16 text-saffron" />
        </div>
        <h1 className="text-4xl font-display uppercase italic mb-4">{isBlockedRegion ? "Region Restricted" : "Arey Yaar!"}</h1>
        <p className="text-xl mb-8 font-accent max-w-md">
          {isBlockedRegion 
            ? "ThikThak is currently not available in Pakistan." 
            : "Location access is required to verify your region access."}
        </p>
        <div className="flex flex-col gap-4 w-full max-w-xs focus-within:ring-2 focus-within:ring-saffron">
          <button 
            onClick={() => window.location.reload()}
            className="bg-saffron text-charcoal font-bold py-4 px-8 rounded-none border-b-4 border-r-4 border-black hover:translate-x-1 hover:translate-y-1 hover:border-b-0 hover:border-r-0 transition-all uppercase tracking-tighter"
          >
            Try Again
          </button>
          
          {/* Subtle bypass for development/preview if needed, but I'll stick to strict for now */}
          <p className="text-ash/30 text-xs mt-4">Required by regional compliance</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
