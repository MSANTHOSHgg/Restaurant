import React, { useState, useEffect } from 'react';
import './CustomerDetails.css';
import axios from 'axios';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CustomerDetails = ({ customerData }) => {
  // State for form inputs
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

  // State for tracking form errors
  const [errors, setErrors] = useState({});

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (customerData.delivery) {
      setFormData(customerData.delivery);
    }
    else {
      const username=customerData.name.split(' ');
      setFormData({
        firstName: username[0],
        lastName: username[1],
        email: customerData.email,
      })
    }
  }, [customerData]);

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First Name is required';
    if (!formData.lastName) newErrors.lastName = 'Last Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.street) newErrors.street = 'Street is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.pinCode) newErrors.pinCode = 'Pin Code is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.put("http://localhost:3001/update-delivery", {
        email: formData.email,
        delivery: formData,
      });
      toast.success('Delivery information updated!', {
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: true,
        autoClose: 3500,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Slide,
      });
    } catch (error) {
      toast.error("Failed to update delivery information.", {
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
  };

  return (
    <>
      <form className="place-order" onSubmit={handleSubmit}>
        <div className="place-order-left">
          <p className="title">Delivery Information</p>

          <div className="multi-field">
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            {errors.firstName && <span className="error">{errors.firstName}</span>}

            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          <input
            type="email"
            placeholder="Email address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}

          <input
            type="text"
            placeholder="Street"
            name="street"
            value={formData.street}
            onChange={handleChange}
            required
          />
          {errors.street && <span className="error">{errors.street}</span>}

          <div className="multi-field">
            <input
              type="text"
              placeholder="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
            {errors.city && <span className="error">{errors.city}</span>}

            <input
              type="text"
              placeholder="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
            {errors.state && <span className="error">{errors.state}</span>}
          </div>

          <div className="multi-field">
            <input
              type="text"
              placeholder="Pin code"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
              required
            />
            {errors.pinCode && <span className="error">{errors.pinCode}</span>}

            <input
              type="text"
              placeholder="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
            {errors.country && <span className="error">{errors.country}</span>}
          </div>

          <input
            type="number"
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
          <div className='submitbtn'>
            <button className="logout" type="submit">Submit</button>
          </div>
        </div>
      </form>

      <ToastContainer />
    </>
  );
};

export default CustomerDetails;
