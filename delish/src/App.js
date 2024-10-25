import './App.css'
import React, { useState } from 'react'
import Nav from './Component/Navigation/Nav'
import Home from './pages/Home/Home'
import { Route,Routes } from 'react-router-dom'
import Login from './Component/Login/Login'
import CartItems from './pages/CartItems/CartItems'
import CustomerDetails from './pages/CustomerDetails/CustomerDetails'
import ExplorMenu from './pages/ExplorMenu/ExplorMenu'
import { Footer } from './Component/Footer/Footer'
import AboutUs from './pages/AboutUs/AboutUs'
import {Policy} from './Component/Policy/Policy'
import PrivacyPolicy from './Component/PrivacyPolicy/PrivacyPolicy'

const App = () => {
  const [login,setlogin]=useState(false)
  const [isLogged,setisLogged] =useState(false)
  const [menu, setmenu] = useState()

  return (
   <>
   {login?<Login setlogin={setlogin} setisLogged={setisLogged} setmenu={setmenu} menu={menu}/>:<></>}
    <div className='app'>
      <Nav setlogin={setlogin}  isLogged={isLogged}  menu={menu} setmenu={setmenu}/>
        <Routes>
        <Route path='/' element={<Home menu={menu} setmenu={setmenu}/>}/>
        <Route path='/Cart' element={<CartItems/>}/>
        <Route path='/Menu' element={<ExplorMenu />}/>
        <Route path='/AboutUs' element={<AboutUs/>}/>
        <Route path='/Profile' element={<CustomerDetails/>}/>
        <Route path='/TermsAndCondition'  element={<Policy menu={menu} setmenu={setmenu}/>}/>
        <Route path='/PrivacyPolicy' element={<PrivacyPolicy/>}/>
        </Routes>
        
    </div>
    <Footer menu={menu} setmenu={setmenu}/>
   </>
  )
}

export default App