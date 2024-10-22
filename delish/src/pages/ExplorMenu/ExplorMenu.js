import React from 'react'
import { useContext,useState } from 'react'
import './ExplorMenu.css'
import { menu_list } from '../../assets/assets'
import FoodItem from '../../Component/FoodItem/FoodItem'
import { StoreContext } from '../../Context/StoreContext';
const ExplorMenu = () => {
    const {food_list}=useContext(StoreContext);
    const [category,setcategory]=useState("All");
  return (
    <div>
        <div className='explor-menu' id='explor-menu'>
        <h1>Explore our menu</h1>
        <p className='explor-menu-text'>Find your favorite dish from our extensive menu, offering a range of culinary delights.</p>
        <div className='explor-menu-list'>
            {menu_list.map((item,index)=>{
                return(
                    <div onClick={()=>setcategory(category=>category===item.menu_name?"All":item.menu_name)} key={index} className='explor-menu-list-item'>
                        <div><img src={item.menu_image} className={category===item.menu_name?"active":""}/>
                        <p className={category===item.menu_name?"act":""}>{item.menu_name}</p></div>
                    </div>
                )
            })}
        </div>
        <hr/>
    </div>


    <div className='food-display' id='food-display'>
        <h2>Top dishes near you</h2>
        <div className='food-display-list'>
          {food_list.map((item,index)=>{
           
            if(category==="All"||category===item.category){
  
            return( 
              
            <div className='food_List'>
              <FoodItem
             key={item._id} 
             id={item._id} 
             name={item.name} 
             price={item.price} 
             description={item.description} 
             image={item.image} />
             </div>
            );
            }
          })}
        </div>
    </div>
    </div>



  )
}

export default ExplorMenu