import React from 'react'
import { useEffect } from 'react'
import video from '../../assets/delish.mp4'
import downArrow from '../../assets/arrowd.png'
import './HomeVideo.css'

export const HomeVideo = () => {
    useEffect(() => {
        const handleScroll = () => {
          const video = document.querySelector('.bgvideo video');
          const arrow = document.querySelector('.downArrow');
          const scrollY = window.scrollY;
    
          if (scrollY > window.innerHeight * 0.90) {
            video.style.display = 'none'; 
            arrow.style.display= 'none';
          } else {
            video.style.display = 'block'; 
            arrow.style.display='block';
          }
        };
    
        
        window.addEventListener('scroll', handleScroll);
    
        
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
      const scroll=()=>{
        window.scrollTo(0,675);
      }
  return (
    <div>
      <div className='bgvideo'>
        <video src={video} autoPlay loop muted/>
    </div>
    <div className='div_arrow'>
       <img onClick={scroll} src={downArrow} className='downArrow'/> 
    </div>
    </div>
  )
}
