import React, { useEffect, useState } from 'react'
import './Orders.css'
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import empty from '../../assets/empty1.png';

export const Orders = ({ orders, setOrders, emailOfUser }) => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3001/order", {
          params: { email: emailOfUser },
        });
        const sortedOrders = response.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setOrders(sortedOrders);
      } catch (err) {
        toast.error('An error occurred while fetching orders.', {
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
      } finally {
        setLoading(false);
      }
    };
    if (emailOfUser) fetchOrders();
  }, [emailOfUser]);

  const handleOrderUpdate = async (id) => {
    try {
      setLoading(true);
      const response = await axios.put(`http://localhost:3001/order/${id}`);
      toast.success('Order status updated successfully', {
        position: 'top-right',
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
        transition: Slide,
      });
      if (response.data) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === id ? response.data : order
          )
        );
      }
    } catch (err) {
      toast.error('Error updating order status', {
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
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="orders-page">
      <h1>My Orders</h1>
      {loading ? (
        <div className="clipLoader" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ClipLoader size={50} color="tomato" loading={loading} />
        </div>
      ) : (
        <>
          {orders.length > 0 ? (
            <div className="orders-container">
              <div className="orders-header">
                <p>Items</p>
                <p className='order-p-center'>Date</p>
                <p className='order-p-center'>Total Price</p>
                <p className='order-p-center'>Payment type</p>
                <p className='order-p-center'>Address</p>
                <p className='order-p-center'>Status</p>
                <p className='order-p-center'>Cancel Order</p>
              </div>
              <div className="orders-list">

                {orders.map((order) => {
                  const totalPrice = order.cartDetails.reduce((sum, item) => sum + item.price * item.quantity, 0);

                  return (
                    <div className="order-item" key={order._id}>
                      <p>
                        {order.cartDetails.map((item, index) => (
                          <span key={index} className='order-name-span'>
                            {item.name} <label>({item.quantity} × ₹{item.price})
                              {index < order.cartDetails.length - 1 && <>,<br /></>}</label>
                          </span>
                        ))}
                      </p>
                      <p className='order-p-center'>{new Date(order.date).toLocaleDateString()}</p>
                      <p className='order-p-center'>₹{totalPrice}</p>
                      <p className='order-p-center'>{order.payment}</p>
                      <p>
                        {order.address.firstName} {order.address.lastName}, {order.address.street}, {order.address.city}, {order.address.state}, {order.address.pinCode}, {order.address.country} <br />
                        <span>Phone: {order.address.phone}</span>
                      </p>
                      <p className='order-p-center'>{order.status}</p>
                      <span onClick={() => handleOrderUpdate(order._id)} className={order.status === "Cancelled" ? "disabled" : "Cancel-Order"}>Cancel</span>
                    </div>
                  );
                })}

              </div>
            </div>
          ) : (
            <div className="no-orders">
              <p>You haven't placed any orders yet!</p>
              <img src={empty} alt="No orders" />
            </div>
          )}</>)}
      <ToastContainer />
    </div>

  )
}
