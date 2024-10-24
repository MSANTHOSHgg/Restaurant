import React from 'react'
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets'
import './Footer.css';

export const Footer = ({ menu, setmenu }) => {
    return (
        <div className='footer'>
            <div className='footer-left'>
                <img className='footer-logo' src={assets.logo} />
                <div className='footer-social-icons'>
                    <img src={assets.facebook_icon} />
                    <img src={assets.twitter_icon} />
                </div>
            </div>
            <div className='footer-container'>
                <ul className='footer-menu'>
                    <span><Link to='/' onClick={() => setmenu("Home")} className={menu === "http://localhost:3000/" ? "active" : ""}>Home</Link></span>
                    <span><Link to='/Menu' onClick={() => setmenu("Menu")} className={menu === "http://localhost:3000/Menu" ? "active" : ""}>Menu</Link></span>
                    <span><Link to='/AboutUs' onClick={() => setmenu("AboutUs")} className={menu === "http://localhost:3000/AboutUs" ? "active" : ""}>About us</Link></span>
                </ul>
            </div>

            <div className='footer-content-contact'>
                <ul>
                    <li>+91 8778676679</li>
                    <li>contact@delish.com</li>
                </ul>
            </div>
            <hr />
            <p className='footer-copyright'>Copyright 2024 &copy; Delish.com - All Rights Reserved.</p>
        </div>
    )
}
