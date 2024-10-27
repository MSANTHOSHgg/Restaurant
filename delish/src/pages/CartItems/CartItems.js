import React, { useContext } from 'react'
import './CartItems.css'
import empty from  '../../assets/empty1.png'
import { StoreContext } from '../../Context/StoreContext'
const CartItems = () => {
    const { cartItem, food_list, removetocart, getTotalAmount, addtocart,remove } = useContext(StoreContext);

    
    return (
        <div className='cart'>
            <div className='cart-items'>
                {food_list.some(item => cartItem[item._id] >0)?
                            <div><div className='cart-items-title'>
                                <p>Items</p>
                                <p>Title</p>
                                <p>Price</p>
                                <p>Quantity</p>
                                <p  >Total</p>
                                <p>Remove</p>
                            </div>
                                <br />
                                <hr /></div>
                                :<div className='cart-NoItems'>
                                    <p>Oops! your cart is empty...</p>
                                    <img src={empty}/>
                                    </div>
                    }
                <div className={'cart-list-scroll'} style={{ overflowY: Object.values(cartItem).some(value => value > 3) ? "visible" : "auto" }}>
                    {food_list.map((item, index) => {
                        if (cartItem[item._id] > 0) {
                            return (
                                <div>
                                    <div className='cart-items-item' key={item._id}>
                                        <img src={item.image} />
                                        <p>{item.name}</p>
                                        <p>₹{item.price}</p>
                                        <span className='quan'>
                                            <button onClick={() => removetocart(item._id)} className='red'>-</button>
                                            <p>{cartItem[item._id]}</p>
                                            <button onClick={() => addtocart(item._id)} className='green'>+</button>
                                        </span>
                                        <p>₹{item.price * cartItem[item._id]}</p>
                                        <p onClick={() => remove(item._id)} className='cross'>x</p>
                                    </div>
                                    <hr />
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
            <div className='cart-bottom'>
                <div className='cart-total'>
                    <h2>Cart Total</h2>
                    <div className='cart-total-details'>
                        <p>Subtotal</p>
                        <p>₹{getTotalAmount()}</p>
                    </div>
                    <hr />
                    <div className='cart-total-details'>
                        <p>Delivery Fee</p>
                        <p>₹{getTotalAmount() === 0 ? 0 : 25}</p>
                    </div>
                    <hr />
                    <div className='cart-total-details'>
                        <p>Total</p>
                        <p className='Final-total'>₹{getTotalAmount() === 0 ? 0 : getTotalAmount() + 20}</p>
                    </div>
                    <button>PROCEED TO PAYMENT</button>
                </div>
            </div>
        </div>
    )
}

export default CartItems