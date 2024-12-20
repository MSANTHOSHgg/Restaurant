// import './App.css'
import React, { useState, useEffect, useContext } from 'react'
import Nav from './Component/Navigation/Nav'
import Home from './pages/Home/Home'
import { Route, Routes } from 'react-router-dom'
import Login from './Component/Login/Login'
import CartItems from './pages/CartItems/CartItems'
import CustomerDetails from './pages/CustomerDetails/CustomerDetails'
import ExplorMenu from './pages/ExplorMenu/ExplorMenu'
import { Footer } from './Component/Footer/Footer'
import AboutUs from './pages/AboutUs/AboutUs'
import { Policy } from './pages/Policy/Policy'
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy'
import ContactUs from './Component/ContactUs/ContactUs'
import ScrollToTop from './Component/ScrollToTop/ScrollToTop';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from './Context/StoreContext'
import ChangePassword from './Component/ChangePassword/ChangePassword'
import { SideNav } from './Component/SideNav/SideNav'
import { Payment } from './pages/Payment/Payment'
import { Orders } from './pages/Orders/Orders'


const App = () => {
  const [login, setlogin] = useState(false)
  const [isLogged, setisLogged] = useState(false)
  const [menu, setmenu] = useState()
  const [existingemail, setexistingemail] = useState("");
  const [customerData, setCustomerData] = useState(null);
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [emailid, setEmailId] = useState("");
  const navigate = useNavigate();

  const [emailOfUser, setEmailOfUser] = useState("");
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setEmailOfUser(foundUser.email);
        }
    }, []);

  const { cartItem, setCartItem, food_list } = useContext(StoreContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pinCode: '',
    country: '',
    phone: '',
  });
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setisLogged(true);
      setCustomerData(foundUser);
      setEmailId(foundUser.email);
    }
  }, []);

  useEffect(() => {
    const weblocation = window.location.href;
    const splitLocation = weblocation.split('/');
    const result = splitLocation[splitLocation.length - 1];
    setmenu(result);
  }, [menu, setmenu]);

  const handleLogout = () => {
    alert("logged out")
    localStorage.removeItem("user");
    setisLogged(false);
    setCartItem("")
    navigate('/')
    window.location.reload();

  };

  const toggleSideNav = () => {
    if (isSideNavOpen)
      setIsSideNavOpen(false);
    else
      setIsSideNavOpen(true)
  };

  const [cartDetails, setCartDetails] = useState({
    name: '',
    price: '',
    quantity: '',
  })

  useEffect(() => {
    const updatedCartDetails = food_list
      .filter((item) => cartItem[item._id] > 0)
      .map((item) => ({
        name: item.name,
        price: item.price,
        quantity: cartItem[item._id],
      }));

    setCartDetails(updatedCartDetails);
  }, [food_list, cartItem]);

  const [orders, setOrders] = useState([]);

  return (
    <>
      {login ? <Login setCustomerData={setCustomerData} navigate={navigate} setlogin={setlogin} setisLogged={setisLogged} setmenu={setmenu} menu={menu} existingemail={existingemail} setexistingemail={setexistingemail} /> : <></>}
      <div className='app' >
        <Nav setlogin={setlogin} isLogged={isLogged} menu={menu} setmenu={setmenu} handleLogout={handleLogout} toggleSideNav={toggleSideNav} />
        {isSideNavOpen && (
          <SideNav menu={menu} setmenu={setmenu} toggleSideNav={toggleSideNav} closeSideNav={() => setIsSideNavOpen(false)} />
        )}
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Home menu={menu} setmenu={setmenu} />} />
          <Route path='/Cart' element={<CartItems isLogged={isLogged} setlogin={setlogin} />} />
          <Route path='/Menu' element={<ExplorMenu />} />
          <Route path='/AboutUs' element={<AboutUs />} />
          <Route path='/Profile' element={<CustomerDetails customerData={customerData} existingemail={existingemail} navigate={navigate} formData={formData} setFormData={setFormData} />} />
          <Route path='/TermsAndCondition' element={<Policy menu={menu} setmenu={setmenu} />} />
          <Route path='/PrivacyPolicy' element={<PrivacyPolicy menu={menu} setmenu={setmenu} />} />
          <Route path='/ContactUs' element={<ContactUs />} />
          <Route path='/ChangePassword' element={<ChangePassword />} />
          <Route path='/Payment' element={<Payment emailOfUser={emailOfUser} customerData={customerData} cartDetails={cartDetails} setCartItem={setCartItem} setOrders={setOrders} />} />
          <Route path='/Orders' element={<Orders emailOfUser={emailOfUser} orders={orders} setOrders={setOrders}/>} />
        </Routes>

      </div>
      <Footer menu={menu} setmenu={setmenu} />

    </>
  )
}

export default App