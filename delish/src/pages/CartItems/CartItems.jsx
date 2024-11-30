import React, { useContext } from 'react';
import './CartItems.css';
import empty from '../../assets/empty1.png';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const CartItems = ({isLogged,setlogin}) => {
    const { cartItem, food_list, removetocart, getTotalAmount, addtocart, remove } = useContext(StoreContext);
    const totalAmount = getTotalAmount();
    const navigate = useNavigate();


    const handlePayment=()=>{
        if(isLogged){
            navigate(`/Payment`)
        }
        else{
            setlogin(true);
        }
    }
    return (
        <div className='cart'>
            <div className='cart-items'>
                {food_list.some(item => cartItem[item._id] > 0) ? (
                    <div>
                        <div className='cart-items-title'>
                            <p>Items</p>
                            <p>Title</p>
                            <p>Price</p>
                            <p>Quantity</p>
                            <p>Total</p>
                            <p>Remove</p>
                        </div>
                        <br />
                        <hr />
                    </div>
                ) : (
                    <div className='cart-NoItems'>
                        <p>Oops! your cart is empty...</p>
                        <img src={empty} alt="Empty cart" />
                    </div>
                )}
                <div className='cart-list-scroll' style={{ overflowY: food_list.filter(item => cartItem[item._id] > 0).length > 3 ? 'auto' : 'visible' }}>
                    {food_list.map((item) => {
                        if (cartItem[item._id] > 0) {
                            return (
                                <div key={item._id}>
                                    <div className='cart-items-item'>
                                        <p><img src={item.image} alt={item.name} /></p>
                                        <p>{item.name}</p>
                                        <p>₹{item.price}</p>
                                        <span className='quan'>
                                            <button onClick={() => removetocart(item._id)} className='red'>-</button>
                                            <p>{cartItem[item._id]}</p>
                                            <button onClick={() => addtocart(item._id)} className='green'>+</button>
                                        </span>
                                        <p>₹{item.price * cartItem[item._id]}</p>
                                        <p onClick={() => remove(item._id)} className='cross'><FontAwesomeIcon icon={faTrash} /></p>
                                    </div>
                                    <hr />
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            </div>
            {food_list.some(item => cartItem[item._id] > 0) &&(
            <div className='cart-bottom'>
                <div className='cart-total'>
                    <h2>Cart Total</h2>
                    <div className='cart-total-details'>
                        <p>Subtotal</p>
                        <p>₹{!isNaN(totalAmount) ? totalAmount : 0}</p>
                    </div>
                    <hr />
                    <div className='cart-total-details'>
                        <p>Delivery Fee</p>
                        <p>₹{totalAmount === 0 ? 0 : 25}</p>
                    </div>
                    <hr />
                    <div className='cart-total-details'>
                        <p>Total</p>
                        <p className='Final-total'>₹{totalAmount === 0 ? 0 : totalAmount + 25}</p>
                    </div>
                    <button 
                    // onClick={() => navigate(`/Payment`)}
                    onClick={() => handlePayment()}
                    >PROCEED TO PAYMENT</button>
                </div>
            </div>)}
        </div>
    );
};

export default CartItems;
