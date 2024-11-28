import React, { useEffect, useState } from 'react'
import { AddressList } from '../../Component/AddressList/AddressList';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AddressModal } from '../../Component/AddressModal/AddressModal';
import axios from 'axios';

export const Payment = ({ customerData, setFormData, formData }) => {
    const [Address, setAddress] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            if (customerData.delivery) {
                setFormData(customerData.delivery);
                setAddress(true);
            } else {
                const username = customerData.name.split(' ');
                setFormData({
                    firstName: username[0] || '',
                    lastName: username.length > 1 ? username[1] : '',
                    email: customerData.email,
                });
                setAddress(false);
            }
        }, 10);
        return () => clearTimeout(timer);
    }, [customerData]);

    const [userAddress, setUserAddress] = useState([]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/customeraddress", formData);
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
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            setIsModalOpen(false);
        }
    };



    return (
        <div className='payment'>
            <div className='payment-container'>
                <div className='DeliveryAddressInfo'>
                    <h2>Address</h2>
                    <div>
                        {Address ? (
                            <>
                                <p>Delivery to:</p>
                                <p>
                                    {/* {formData.firstName} {formData.lastName}, {formData.street}, {formData.city},
                                    {formData.state} - {formData.pinCode}, {formData.country} */}
                                </p>
                                <div className="addresscontainer">
                                    {Array.isArray(userAddress) && userAddress.length > 0 ? (
                                        userAddress.map((address) => (
                                            <AddressList key={address._id} address={address} className="AddressList-container" />
                                        ))
                                    ) : (
                                        <p>No addresses found</p> // Show a message if no addresses are available
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <p>No Address found</p>
                            </>
                        )}
                        <button onClick={() => setIsModalOpen(true)}>Add new address</button>
                    </div>
                </div>
                <div className='payment-mode'>
                    <h2>Payment Mode</h2>
                    <div className='payment-type'>
                        <input type="radio" id="cod" name="paymentmode" value="cod" />
                        <label for="cod">Cash On Delivery</label>
                        <br />
                        <input type="radio" id="upi" name="paymentmode" value="upi" />
                        <label for="upi">Pay via UPI</label>
                    </div>
                </div>
            </div>
            <button>Place Order</button>
            <AddressModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleOverlayClick={handleOverlayClick}
            />
            <ToastContainer />
        </div>
    )
}
