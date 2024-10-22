import React, { useState } from 'react'
import {Link} from 'react-router-dom';


import './Header.css'
const Header = ({menu, setmenu}) => {
  const refresh=()=>{
      window.location.reload(false);
  }
  
  return (
    
    <div className='header'>
        <div className='header-content'>
            <h2>Order your favourite food here..</h2>
            <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredient.</p>
            <button onClick={()=>setmenu("Menu")}><span><Link to='/Menu'>View Menu</Link></span></button>
        </div>
    </div>
  )
}

export default Header