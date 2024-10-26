import React, { useContext, useState, useEffect } from 'react'
import './Nav.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
const Nav = ({ setlogin, isLogged, menu, setmenu }) => {


  useEffect(() => {
    const web = window.location.href;
    setmenu(web)
  }, [menu])

  const { getTotalAmount } = useContext(StoreContext);



  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} className='logo' /></Link>
      <ul className='navbar-menu'>
        <span><Link to='/' onClick={() => setmenu("Home")} className={menu === "http://localhost:3000/" ? "active" : ""}>Home</Link></span>
        <span><Link to='/Menu' onClick={() => setmenu("Menu")} className={menu === "http://localhost:3000/Menu" ? "active" : ""}>Menu</Link></span>
        <span><Link to='/AboutUs' onClick={() => setmenu("AboutUs")} className={menu === "http://localhost:3000/AboutUs" ? "active" : ""}>About us</Link></span>
      </ul>
      <div className='navbar-right'>
        <div className='navbar-search-icon'>
          <Link to='/cart' onClick={() => setmenu("cart")} className={menu === "http://localhost:3000/cart" ? "active" : ""}><img className="basket" src={assets.basket_icon} /></Link>
          <div className={getTotalAmount() === 0 ? "" : "dot"}></div>
        </div>
        {isLogged ? (
          <Link to='/Profile' onClick={() => setmenu("Profile")} className={menu === "http://localhost:3000/Profile" ? "active" : ""}> <img className='profile' src={assets.profile_icon} /> </Link>)
          : <button onClick={() => setlogin(true)}>Sign in</button>}
      </div>
    </div>

  )
}

export default Nav