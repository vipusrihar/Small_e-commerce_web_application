import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import UserCard from '../components/UserCard';
import { loginUser } from '../state/auth/authAction';


const ProfilePage = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (location.pathname === '/profile') {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [location]);

  useEffect(() => {
    dispatch(loginUser());
  }, [dispatch]);

  const user = useSelector((state) => state.auth.auth);
  const isLoading = useSelector((state) => state.auth.isLoading);


  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      {isLoading ? (
        <p className="text-gray-500">Loading...</p>
      ) : user ? (
        <UserCard user={user} open={open} onClose={() => setOpen(false)} />
      ) : (
       <div> loading</div>
      )}
    </div>
  );
};

export default ProfilePage;
