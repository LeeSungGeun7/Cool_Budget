"use client"
import { useEffect, useState } from 'react';

declare global {
    interface Window {
      opera: any;
    }
  }

const useIsMobile = () : boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    setIsMobile(mobileRegex.test(userAgent));
  }, []);

  return isMobile;
};

export default useIsMobile;