import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext';
const FoodItem = ({ id, name, price, description, image }) => {
    const { cartItem, addtocart, removetocart } = useContext(StoreContext)
    const maxQuantity = 5;
    return (
    <div className='food-item'>
        <div className='food-item-img-container'>
            <img className='food-item-img' src={image}></img>
            {!cartItem[id]?<img className='add' onClick={()=>addtocart(id)} src={assets.add_icon_white}/>
            :<div className='food-item-counter'>
                <button onClick={()=>removetocart(id)} className='red'>-</button>
                <p>{cartItem[id]}</p>
                <button onClick={()=>addtocart(id)} 
                className={cartItem[id] < maxQuantity ? 'green' : 'grey'}>+</button>
            </div> }
        </div>
        <div className='food-item-info'>
            <div className='food-item-name-rating'>
                <p>{name}</p>
                <img src={assets.rating_starts}></img>
            </div>
            <p className='food-item-des'>{description}</p>
            <p className='food-item-price'>Rs.{price}</p>
        </div>
    </div >
  )
}

export default FoodItem