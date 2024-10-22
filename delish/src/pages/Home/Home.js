import React, { useState } from 'react'
import './Home.css'
import Header from '../../Component/Header/Header'

const Home = ({menu,setmenu}) => {
  
  return (
    <div>
        <Header menu={menu} setmenu={setmenu}/>
        
    </div>
  )
}

export default Home