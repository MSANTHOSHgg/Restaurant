import React from 'react'

export const AddressList = ({address}) => {
  return (
    <div className="Address-card" >
            <p>{address.firstName} {address.lastName}, {address.street}, {address.city},
            {address.state} - {address.pinCode}, {address.country}</p>
            <p>{address.phone}</p>
        </div>
  )
}
