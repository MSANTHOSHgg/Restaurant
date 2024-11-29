import React, { useEffect, useState } from 'react'
import { AddressList } from '../../Component/AddressList/AddressList';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AddressModal } from '../../Component/AddressModal/AddressModal';
import axios from 'axios';
import './Payment.css'

export const Payment = ({ customerData }) => {

    const [emailOfUser, setEmailOfUser] = useState("");
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setEmailOfUser(foundUser.email);
        }
    }, []);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;

            if (addressData._id) {
                response = await axios.put(`http://localhost:3001/customeraddress/${addressData._id}`, addressData);
            } else {
                response = await axios.post("http://localhost:3001/customeraddress", addressData);
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
        }

        const handleDelete = async (id) => {
            try {
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
        };

    const [isModalOpen, setIsModalOpen] = useState(false);

        const handleOverlayClick = (e) => {
            if (e.target === e.currentTarget) {
                setIsModalOpen(false);
            }
        };

        useEffect(() => {
            const fetchAddress = async () => {
                try {
                    const response = await axios.get("http://localhost:3001/customeraddress", {
                        params: { email: emailOfUser },
                    });
                    console.log(response.data)
                    setUserAddress(response.data);
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

        const [selectedAddress, setSelectedAddress] = useState(null);

        const handleAddressSelection = (address) => {
            setSelectedAddress(address);
        };

        const handleEdit = (address) => {
            setaddressFormData(address);
            setIsModalOpen(true);
        };

        return (
            <div className='payment'>
                <div className='payment-container'>
                    <div className='DeliveryAddressInfo'>
                        <h2>Address</h2>
                        <div>
                            {(!userAddress || userAddress.length === 0) ? (
                                <p>No Address found</p>
                            ) : (
                                <>
                                    <p>Delivery to:</p>
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
                                                <label htmlFor={`address-${index}`}>
                                                    <AddressList key={address._id} address={address} onEdit={handleEdit} handleDelete={handleDelete}/>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                            <button onClick={() => setIsModalOpen(true)} className='AddAddressBtn'>Add new address</button>
                        </div>

                    </div>
                    <div className='payment-mode'>
                        <h2>Payment Mode</h2>
                        <div className='payment-type'>
                            <input type="radio" id="cod" name="paymentmode" value="cod" />
                            <label htmlFor="cod">Cash On Delivery</label>
                            <br />
                            <input type="radio" id="upi" name="paymentmode" value="upi" />
                            <label htmlFor="upi">Pay via UPI</label>
                        </div>
                    </div>
                    <button>Place Order</button>
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
            </div>
        )
    }
