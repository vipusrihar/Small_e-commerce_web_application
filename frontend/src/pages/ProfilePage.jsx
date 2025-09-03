import React from 'react'
import { useSelector } from 'react-redux'
import UserCard from '../components/USerCard';


const ProfilePage = () => {

    const user = useSelector((state) => state.auth.auth);
    console.log(user)

    return (
        <div className="flex justify-center">
            <UserCard user={user} />
        </div>
    )
}

export default ProfilePage
