import React from 'react'
import './AddressList.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

export const AddressList = ({ address, onEdit, handleDelete }) => {
  return (
    <div className="Address-card" >
      <div>
        <span><p>{address.firstName} {address.lastName} - {address.phone}</p>
          <p>{address.street}, {address.city},
            {address.state} - {address.pinCode}, {address.country}</p></span>
      </div>
      <div>
        <button onClick={() => onEdit(address)}><FontAwesomeIcon icon={faPenToSquare} /></button>
        <button onClick={() => handleDelete(address._id)}><FontAwesomeIcon icon={faTrash} /></button>
      </div>
    </div>
  )
}
