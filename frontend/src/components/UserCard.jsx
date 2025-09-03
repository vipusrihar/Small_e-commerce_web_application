import React from 'react'

const UserCard = ({ user }) => {
  return (
    <div>
       <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-4">{user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone_number}</p>
      <p><strong>Username:</strong> {user.preferred_username}</p>
      <p><strong>Role:</strong> {user.roles}</p>
      <p><strong>Address:</strong> {user.street_address}, {user.postal_code}, {user.country}</p>
    </div>
    </div>
  )
}

export default UserCard




