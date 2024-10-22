import React from 'react'
import { useEffect } from 'react'
import video from '../../assets/delish.mp4'
import './HomeVideo.css'
export const HomeVideo = () => {
    useEffect(() => {
        const handleScroll = () => {
          const video = document.querySelector('.bgvideo video');
          const scrollY = window.scrollY;
    
          if (scrollY > window.innerHeight * 0.90) {
            video.style.display = 'none'; // Hide video
          } else {
            video.style.display = 'block'; // Show video
          }
        };
    
        // Attach the scroll event listener
        window.addEventListener('scroll', handleScroll);
    
        // Clean up the event listener on component unmount
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
  return (
    <div className='bgvideo'>
        
        <video src={video} autoPlay loop muted/>
        
    </div>
  )
}
