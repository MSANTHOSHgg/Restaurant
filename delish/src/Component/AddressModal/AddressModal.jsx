import React from 'react'
import './AddressModal.css'
export const AddressModal = ({isModalOpen, formData, handleChange, handleSubmit, setIsModalOpen, handleOverlayClick}) => {
    return (
        <>
            {isModalOpen && (<div className="modal-overlay" onClick={handleOverlayClick}>
                <div className="modal-content">
                    <button className="close-button" onClick={() => setIsModalOpen(false)}>
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
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="input-group">
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        name="lastName"
                                        value={formData.lastName}
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
                                    value={formData.street}
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
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="input-group">
                                    <input
                                        type="text"
                                        placeholder="State"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="multi-field">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        placeholder="Pin code"
                                        name="pinCode"
                                        value={formData.pinCode}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="input-group">
                                    <input
                                        type="text"
                                        placeholder="Country"
                                        name="country"
                                        value={formData.country}
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
                                    value={formData.phone}
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
            </div>)}</>
    )
}
