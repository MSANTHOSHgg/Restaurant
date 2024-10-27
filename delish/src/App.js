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
import {Policy} from './pages/Policy/Policy'
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy'
import ContactUs from './Component/ContactUs/ContactUs'
import ScrollToTop from './Component/ScrollToTop/ScrollToTop';
import { useNavigate, useLocation } from 'react-router-dom';


const App = () => {
  const [login,setlogin]=useState(false)
  const [isLogged,setisLogged] =useState(false)
  const [menu, setmenu] = useState()
  const [existingemail, setexistingemail] = useState("");
  const [customerData, setCustomerData] = useState(null);
  const navigate = useNavigate();  

  return (
   <>
   {login?<Login setCustomerData={setCustomerData} navigate={navigate} setlogin={setlogin} setisLogged={setisLogged} setmenu={setmenu} menu={menu} existingemail={existingemail} setexistingemail={setexistingemail} />:<></>}
    <div className='app'>
      <Nav setlogin={setlogin}  isLogged={isLogged}  menu={menu} setmenu={setmenu}/>
      <ScrollToTop />
        <Routes>
        <Route path='/' element={<Home menu={menu} setmenu={setmenu}/>}/>
        <Route path='/Cart' element={<CartItems/>}/>
        <Route path='/Menu' element={<ExplorMenu />}/>
        <Route path='/AboutUs' element={<AboutUs/>}/>
        <Route path='/Profile' element={<CustomerDetails customerData={customerData} existingemail={existingemail} navigate={navigate}/>}/>
        <Route path='/TermsAndCondition'  element={<Policy menu={menu} setmenu={setmenu}/>}/>
        <Route path='/PrivacyPolicy' element={<PrivacyPolicy menu={menu} setmenu={setmenu}/>}/>
        <Route path='/ContactUs' element={<ContactUs/>}/>
        </Routes>
        
    </div>
    <Footer menu={menu} setmenu={setmenu}/>
   </>
  )
}

export default App