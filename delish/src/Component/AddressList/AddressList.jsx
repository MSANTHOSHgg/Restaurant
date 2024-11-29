import React from 'react'
import './AddressList.css'
export const AddressList = ({ address, onEdit, handleDelete }) => {
  return (
    <div className="Address-card" >
      <div>
        <span><p>{address.firstName} {address.lastName} - {address.phone}</p>
          <p>{address.street}, {address.city},
            {address.state} - {address.pinCode}, {address.country}</p></span>
      </div>
      <div>
        <button onClick={() => onEdit(address)}>Edit</button>
        <button onClick={() => handleDelete(address._id)}>Delete</button>
      </div>
    </div>
  )
}
