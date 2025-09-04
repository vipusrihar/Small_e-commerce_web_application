import { Modal } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const UserCard = ({ user, open, onClose }) => {
  const navigate = useNavigate();
  const handleCLose = () => {
    
    navigate("/");
    onClose
  }
  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-md bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">{user.name}</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone_number}</p>
          <p><strong>Username:</strong> {user.preferred_username}</p>
          <p><strong>Role:</strong> {user.roles}</p>
          <p>
            <strong>Address:</strong> {user.street_address}, {user.postal_code}, {user.country}
          </p>

          <div className="flex justify-end mt-6">
            <button
              onClick={() => handleCLose()}
              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default UserCard
