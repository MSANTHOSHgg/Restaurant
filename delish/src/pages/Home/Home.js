import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import video from '../../assets/delish.mp4';
import downArrow from '../../assets/arrowd.png';

const Home = ({ menu, setmenu }) => {
  // Handle video and arrow visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      const videoElement = document.querySelector('.bgvideo video');
      const arrowElement = document.querySelector('.downArrow');
      const scrollY = window.scrollY;

      if (scrollY > window.innerHeight * 0.9) {
        videoElement.style.display = 'none';
        arrowElement.style.display = 'none';
      } else {
        videoElement.style.display = 'block';
        arrowElement.style.display = 'block';
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Scroll to content section on arrow click
  const scrollToContent = () => {
    window.scrollTo({ top: 675, behavior: 'smooth' });
  };

  return (
    <div className='homevideo'>
      {/* Background Video Section */}
      <div className='bgvideo'>
        <video src={video} autoPlay loop muted />
      </div>

      {/* Scroll Down Arrow */}
      <div className='div_arrow'>
        <img
          onClick={scrollToContent}
          src={downArrow}
          alt='Scroll Down'
          className='downArrow'
        />
      </div>

      {/* Header Section */}
      <div className='header'>
        <div className='header-content'>
          <h2>Order your favourite food here..</h2>
          <p>
            Choose from a diverse menu featuring a delectable array of dishes
            crafted with the finest ingredients.
          </p>
          
            <Link onClick={() => setmenu('Menu')} to='/Menu'>
            <span>View Menu</span>
            </Link>
            
        </div>
      </div>
    </div>
  );
};

export default Home;
