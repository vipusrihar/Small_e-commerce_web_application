import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import UserCard from '../components/UserCard'
import { useLocation } from 'react-router-dom'

const ProfilePage = () => {
  const location = useLocation()

  // ✅ declare state first
  const [open, setOpen] = useState(false)

  // ✅ then use it inside useEffect
  useEffect(() => {
    if (location.pathname === '/profile') {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [location])

  const user = useSelector((state) => state.auth.auth)
  const isLoading = useSelector((state) => state.auth.isLoading)

  console.log('User:', user)

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      {isLoading ? (
        <p className="text-gray-500">Loading...</p>
      ) : user ? (
        <UserCard user={user} open={open} onClose={() => setOpen(false)} />
      ) : (
        <p className="text-red-500">No user data available</p>
      )}
    </div>
  )
}

export default ProfilePage
