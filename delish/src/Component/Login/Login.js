import React, { useState } from 'react'
import './Login.css'
import axios from 'axios'
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Login = ({ setlogin, setisLogged, setmenu,menu }) => {
    const [currentState, setcurrentState] = useState("Login");
    const [existingemail, setexistingemail] = useState("");
    const [existingpass, setexistingpass] = useState("");
    const [Serror, setSerror] = useState({});
    const [Lerror, setLerror] = useState({});
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [agree,setagree]=useState("");

    // Signup Validation Logic
    const validateSignup = () => {
        const errors = {};
        if (!name.trim()) errors.name = "Fullname is required.";
        if (!email) errors.email = "Email is required.";
        else if (!/^[^\s@]+@[^\s@]+\.(com|in)$/.test(email)) {
            errors.email = "Enter a valid email address.";
        }
        if (!password) errors.password = "Password is required.";
        else if (password.length < 8) {
            errors.password = "Password must contain at least eight characters.";
        }
        if(agree==="") errors.agree="Required"
        return errors;
    };

    // Login Validation Logic
    const validateLogin = () => {
        const errors = {};
        if (!existingemail) errors.existingemail = "Email is required.";
        else if (!/^[^\s@]+@[^\s@]+\.(com|in)$/.test(existingemail)) {
            errors.existingemail = "Enter a valid email address.";
        }
        if (!existingpass) errors.existingpass = "Password is required.";
        else if (existingpass.length < 8) {
            errors.existingpass = "Invalid Password.";
        }
        return errors;
    };

    // Handle Signup Submission
    const addCredential = async (e) => {
        e.preventDefault();
        const signupError = validateSignup();
        if (Object.keys(signupError).length === 0) {
            try {
                await axios.post("http://localhost:3001/newregister", { name, email, password });
                toast.success('Account Created Successfully!', {
                    position: "top-right",
                    hideProgressBar: false,
                    closeOnClick: true,
                    autoClose: 3500,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                    transition: Slide,
                },setcurrentState("Login"),setname(""),setemail(""),setpassword(""));
                setSerror({});
                 setTimeout(() => setlogin(false),30000);
            } catch (error) {
                toast.error("Something went wrong. Please try again.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                    transition: Slide,
                });
            }
        } else {
            setSerror(signupError);
        }
    };

    // Handle Login Submission
    const handleLogin = async (e) => {
        e.preventDefault();
        const loginError = validateLogin();
        if (Object.keys(loginError).length === 0) {
            try {
                const result = await axios.post('http://localhost:3001/customerdetails', { existingemail, existingpass });
                console.log(result);
                toast.success('Login Successfully!', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                    transition: Slide,
                });
                setTimeout(() => setlogin(false), 1000);
                setisLogged(true);
            } catch (error) {
                console.error(error);
                toast.error("Login Failed. Please check your credentials.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                    transition: Slide,
                });
            }
        } else {
            setLerror(loginError);
        }
    };

    const handlePolicy=()=>{
        setlogin(false);
        setmenu("Policy");
    }

    return (
        <>
            <div className='login'>
                <form className='login-container'>
                    <div className='login-title'>
                        <h2>{currentState}</h2>
                        <img
                            onClick={() => setlogin(false)}
                            src={require('../../assets/cross_icon.png')}
                            alt="Close"
                        />
                    </div>

                    <div className='login-input'>
                        {currentState === "Login" ? (
                            <>
                                <input
                                    type='email'
                                    placeholder='Enter Email Address'
                                    value={existingemail}
                                    onChange={(e) => setexistingemail(e.target.value)}
                                    required
                                />
                                {Lerror.existingemail && <div id='error'>{Lerror.existingemail}</div>}

                                <input
                                    type='password'
                                    placeholder='Enter Password'
                                    value={existingpass}
                                    onChange={(e) => setexistingpass(e.target.value)}
                                    required
                                />
                                {Lerror.existingpass && <div id='error'>{Lerror.existingpass}</div>}

                                <button type='submit' onClick={handleLogin}>Sign In</button>
                            </>
                        ) : (
                            <>
                                <input
                                    type='text'
                                    placeholder='Fullname'
                                    value={name}
                                    onChange={(e) => setname(e.target.value)}
                                    required
                                />
                                {Serror.name && <div id='error'>{Serror.name}</div>}

                                <input
                                    type='email'
                                    placeholder='eg: mahi@gmail.com'
                                    value={email}
                                    onChange={(e) => setemail(e.target.value)}
                                    required
                                />
                                {Serror.email && <div id='error'>{Serror.email}</div>}

                                <input
                                    type='password'
                                    placeholder='Password'
                                    value={password}
                                    onChange={(e) => setpassword(e.target.value)}
                                    maxLength={8}
                                    required
                                />
                                {Serror.password && <div id='error'>{Serror.password}</div>}

                                <button type='submit' onClick={addCredential}>Create Account</button>

                                <div className='login-condition'>
                                    <label className='login-conditon-input'>
                                        <input type='checkbox' 
                                        onChange={()=>setagree("true")}
                                        required/>
                                        <p>By continuing, I agree to the terms of use & privacy policy.</p>
                                        
                                        
                                    </label>
                                </div>
                                {Serror.agree && <div id='error'>{Serror.agree}</div>}
                                <span><Link to='/TermsAndCondition' onClick={()=>handlePolicy()} className={menu === "http://localhost:3000/TermsAndCondition" ? "active" : ""}>Terms and Condition</Link></span> 
                            </>
                        )}
                    </div>

                    <p>
                        {currentState === "Login" ? (
                            <>Create a new account? <span onClick={() => setcurrentState("Sign Up")}>Click here</span></>
                        ) : (
                            <>Already have an account? <span onClick={() => setcurrentState("Login")}>Login here</span></>
                        )}
                    </p>
                </form>
            </div>
            <ToastContainer />
        </>
    );
};

export default Login;