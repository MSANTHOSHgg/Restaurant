import React, { useState } from 'react'
import './Home.css'
import Header from '../../Component/Header/Header'
import { HomeVideo } from '../../Component/HomeVideo/HomeVideo'

const Home = ({menu,setmenu}) => {
  
  return (
    <div>
        <div className='bgdelish'><HomeVideo /></div>
        <Header menu={menu} setmenu={setmenu}/>
        
    </div>
  )
}

export default Home