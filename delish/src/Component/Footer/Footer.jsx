import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faXTwitter } from '@fortawesome/free-brands-svg-icons';

export const Footer = ({ menu, setmenu }) => {
    function copyToClipboard() {
        const phoneNumber = document.getElementById("phoneNumber").innerText;
        navigator.clipboard.writeText(phoneNumber)
    }
    return (
        <div className='footer'>
            <div className='footer-left'>
                <img className='footer-logo' src={assets.logo} alt='Delish Logo' />
                <div className='footer-social-icons'>
                    <span><FontAwesomeIcon icon={faFacebook} /></span>
                    <span><FontAwesomeIcon icon={faXTwitter} /></span>
                </div>
            </div>

            <div className='footer-container'>
                <div className='footer-menu'>
                    <span><Link to='/TermsAndCondition' onClick={() => setmenu("Terms")} className={menu === "TermsAndCondition" ? "active" : ""}>Terms and Condition</Link></span>
                    <span><Link to='/PrivacyPolicy' onClick={() => setmenu("Privacy")} className={menu === "PrivacyPolicy" ? "active" : ""}>Privacy policy</Link></span>
                    <span><Link to='/ContactUs' onClick={() => setmenu("ContactUs")} className={menu === "ContactUs" ? "active" : ""}>Contact Us</Link></span>
                </div>
            </div>

            <div className='footer-content-contact'>
                <ul>
                    <li onClick={() => copyToClipboard() } id='phoneNumber'>+91 8778676679</li>
                    <li><a href="mailto:contact@gmail.com" id="emailLink">contact@delish.com</a></li>
                </ul>
            </div>

            <hr />
            <p className='footer-copyright'>
                Copyright 2024 &copy; Delish.com - All Rights Reserved.
            </p>
        </div>
    );
};

export default Footer;
