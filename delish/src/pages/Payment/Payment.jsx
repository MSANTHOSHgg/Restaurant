import React, { useEffect, useState } from 'react'
import { AddressList } from '../../Component/AddressList/AddressList';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AddressModal } from '../../Component/AddressModal/AddressModal';
import axios from 'axios';
import './Payment.css'
import { ClipLoader } from "react-spinners";
import { useNavigate } from 'react-router-dom';

export const Payment = ({ customerData, cartDetails, setOrders, setCartItem, emailOfUser }) => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [userAddress, setUserAddress] = useState([]);
    const [addressData, setaddressFormData] = useState({
        email: emailOfUser || '',
        firstName: '',
        lastName: '',
        street: '',
        city: '',
        state: '',
        pinCode: '',
        country: '',
        phone: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setaddressFormData({ ...addressData, [name]: value });
        setaddressFormData((prevData) => ({
            ...prevData,
            email: customerData.email,
        }));
    };

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:3001/customeraddress", {
                    params: { email: emailOfUser },
                });
                setUserAddress(response.data);
                setLoading(false);
            } catch (err) {
                toast.error('An error occured', {
                    position: 'top-right',
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'light',
                    transition: Slide,
                });
                console.error(err);
            }
        };

        if (emailOfUser) fetchAddress();
    }, [emailOfUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            setLoading(true);
            if (addressData._id) {
                response = await axios.put(`http://localhost:3001/customeraddress/${addressData._id}`, addressData);
                toast.success('Address Updated', {
                    position: 'top-right',
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'light',
                    transition: Slide,
                });
            } else {
                response = await axios.post("http://localhost:3001/customeraddress", addressData);
                toast.success('Address added', {
                    position: 'top-right',
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'light',
                    transition: Slide,
                });
            }
            if (response.data) {
                setUserAddress((prevData) => {
                    if (addressData._id) {
                        return prevData.map((address) =>
                            address._id === addressData._id ? response.data : address
                        );
                    } else {
                        return [...prevData, response.data];
                    }
                });
            }
            setIsModalOpen(false);
        } catch (err) {
            toast.error('Try again', {
                position: 'top-right',
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'light',
                transition: Slide,
            });
            console.error(err);
        }
        finally {
            setaddressFormData({
                email: '',
                firstName: '',
                lastName: '',
                street: '',
                city: '',
                state: '',
                pinCode: '',
                country: '',
                phone: '',
            });
            setLoading(false);
        }
    }

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            const response = await axios.delete(`http://localhost:3001/customeraddress/${id}`);
            setUserAddress((prevData) => prevData.filter((address) => address._id !== id));
            toast.success('Address deleted successfully', {
                position: 'top-right',
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'light',
                transition: Slide,
            });
        } catch (err) {
            toast.error('Error deleting address', {
                position: 'top-right',
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'light',
                transition: Slide,
            });
            console.error(err);
        }
        finally {
            setLoading(false);
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            setIsModalOpen(false);
        }
    };

    const [selectedAddress, setSelectedAddress] = useState(null);
    useEffect(() => {
        if (userAddress.length > 0 && !selectedAddress) {
            setSelectedAddress(userAddress[0]);
        }
    }, [userAddress, selectedAddress]);
    const handleAddressSelection = (address) => {
        setSelectedAddress(address);
    };

    const handleEdit = (address) => {
        setaddressFormData(address);
        setIsModalOpen(true);
    };

    const [paymentType, setPaymentType] = useState("Cash On Delivery");

    const handlePaymentChange = (event) => {
        setPaymentType(event.target.value);
    };

    const [isProcessing, setIsProcessing] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [UPIPayment, setUPIPayment] = useState(false);

    const handleOrders = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        try {
            let response;
            response = await axios.post(`http://localhost:3001/order/`, {
                email: emailOfUser,
                cartDetails: cartDetails,
                address: selectedAddress,
                payment: paymentType,
            });
            if (response.status === 201) {
                setCartItem({});
                setSelectedAddress('');
                setOrderSuccess(true);
            }
        } catch (err) {
            console.error(err);
            setIsProcessing(false);
            toast.error("Failed to place order", {
                position: 'top-right',
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'light',
                transition: Slide,
            });
        }
    }

    const handleOrderPayment = (e) => {
        e.preventDefault();
        if (paymentType === "Cash On Delivery") {
            handleOrders(e);
        }
        else {
            setUPIPayment(true);
        }
    }

    return (
        <div className='payment'>
            <div className={isProcessing || UPIPayment ? "payment-container blur-background" : "payment-container"}>
                <div className='DeliveryAddressInfo'>
                    <h2>Delivery to</h2>
                    <div>
                        {loading ? (
                            <div className="clipLoader">
                                <ClipLoader size={50} color="tomato" loading={loading} />
                            </div>
                        ) : (
                            <>
                                {(!userAddress || userAddress.length === 0) ? (
                                    <p>No Address found</p>
                                ) : (
                                    <>

                                        <div className="addresscontainer">
                                            {userAddress.map((address, index) => (
                                                <div key={address._id || index} className="AddressList-container">
                                                    <input
                                                        type="radio"
                                                        id={`address-${index}`}
                                                        name="selectedAddress"
                                                        value={address._id}
                                                        checked={selectedAddress?._id === address._id}
                                                        onChange={() => handleAddressSelection(address)}
                                                    />
                                                    <label htmlFor={`address-${index}`} className='paymentLabel'>
                                                        <AddressList
                                                            key={address._id}
                                                            address={address}
                                                            onEdit={handleEdit}
                                                            handleDelete={handleDelete}
                                                        />
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                                <button onClick={() => setIsModalOpen(true)} className="AddAddressBtn">Add new address</button>
                            </>
                        )}
                    </div>
                </div>
                <div className='payment-mode'>
                    <h2>Payment Mode</h2>
                    <div className='paymentmode-container'>
                        <div className='payment-type' onChange={handlePaymentChange}>
                            <div>
                                <input type="radio" id="Cash On Delivery" name="paymentmode" value="Cash On Delivery" defaultChecked />
                                <label htmlFor="Cash On Delivery" >Cash On Delivery</label>
                            </div>

                            <div>
                                <input type="radio" id="Pay via UPI" name="paymentmode" value="Pay via UPI" />
                                <label htmlFor="Pay via UPI" >Pay via UPI</label>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="submitbtn1">
                    <button className="logout" type="submit" onClick={handleOrderPayment}>Place Order</button>
                </div>
            </div>

            <AddressModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                addressData={addressData}
                setaddressFormData={setaddressFormData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleOverlayClick={handleOverlayClick}
            />
            <ToastContainer />

            {isProcessing && (
                <div className="processing-modal-overlay">
                    <div className="processing-modal">
                        {orderSuccess ? (
                            <div className="success-message">
                                <h2>Order Placed Successfully!</h2>
                                <p>Your order has been placed. Thank you for ordering food with us!</p>
                                <button onClick={() => {
                                    setIsProcessing(false);
                                    setOrderSuccess(false);
                                    navigate('/');
                                }}>Home</button>
                                <button onClick={() => {
                                    setIsProcessing(false);
                                    setOrderSuccess(false);
                                    navigate('/Orders');
                                }}>View Orders</button>
                            </div>
                        ) : (
                            <div className="processing-message">
                                <h2>Processing Your Order...</h2>
                                <ClipLoader size={50} color="tomato" loading={true} />
                            </div>
                        )}
                    </div>
                </div>
            )}

            {UPIPayment && (
                <div className='UPI-payment-modal-overlay'>
                    <div className='UPI-modal'>
                        <h2>UPI Payment</h2>
                        <label>Enter UPI ID</label>
                        <input type="text"
                            placeholder="Enter UPI ID"
                            name="UPI_ID"
                            required />
                        <button onClick={(e) => {
                            const upiInput = document.querySelector('.UPI-modal input').value;
                            if (!upiInput || !upiInput.includes('@')) {
                                toast.error("Please enter a valid UPI ID", {
                                    position: 'top-right',
                                    autoClose: 3500,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    theme: 'light',
                                    transition: Slide,
                                });
                                return;
                            }
                            handleOrders(e);
                            setUPIPayment(false);
                            
                        }}>Pay</button>
                    </div>
                </div>
            )}
        </div>
    )
}
