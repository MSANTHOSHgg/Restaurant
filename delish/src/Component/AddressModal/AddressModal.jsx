import React from 'react'
import './AddressModal.css'
export const AddressModal = ({ isModalOpen, addressData, handleChange, handleSubmit, setIsModalOpen, handleOverlayClick, setaddressFormData }) => {
    return (
        <>
            {isModalOpen && (<div className="modal-overlay" onClick={handleOverlayClick}>
                <div className="modal-content">
                    <button
                        className="close-button"
                        onClick={() => {
                            setIsModalOpen(false);
                            setaddressFormData({
                                email:'',
                                firstName: '',
                                lastName: '',
                                street: '',
                                city: '',
                                state: '',
                                pinCode: '',
                                country: '',
                                phone: '',
                            });
                        }}
                    >
                        &times;
                    </button>
                    <form className="place-order" onSubmit={handleSubmit}>
                        <div className="place-order-left">
                            <p className="title">Delivery Address</p>

                            <div className="multi-field">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        name="firstName"
                                        value={addressData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="input-group">
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        name="lastName"
                                        value={addressData.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="Street"
                                    name="street"
                                    value={addressData.street}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="multi-field">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        placeholder="City"
                                        name="city"
                                        value={addressData.city}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="input-group">
                                    <input
                                        type="text"
                                        placeholder="State"
                                        name="state"
                                        value={addressData.state}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="multi-field">
                                <div className="input-group">
                                    <input
                                        type="number"
                                        placeholder="Pin code"
                                        name="pinCode"
                                        value={addressData.pinCode}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="input-group">
                                    <input
                                        type="text"
                                        placeholder="Country"
                                        name="country"
                                        value={addressData.country}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <input
                                    type="number"
                                    placeholder="Phone"
                                    name="phone"
                                    value={addressData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="submitbtn1">
                                <button className="logout" type="submit">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div >)
            }</>
    )
}
