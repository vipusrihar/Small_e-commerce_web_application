import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserCard = ({ user, open, onClose }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
    onClose();
  };

  if (!user) return null; // Defensive check

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Box
          sx={{
            maxWidth: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 3,
            p: 4,
          }}
        >
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {user.name}
          </Typography>
          <Typography><strong>Email:</strong> {user.email}</Typography>
          <Typography><strong>Phone:</strong> {user.phone_number}</Typography>
          <Typography><strong>Username:</strong> {user.preferred_username}</Typography>
          <Typography><strong>Role:</strong> {user.roles}</Typography>
          <Typography>
            <strong>Address:</strong> {user.street_address}, {user.postal_code}, {user.country}
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              onClick={handleClose}
              sx={{
                backgroundColor: '#ef4444',
                color: '#fff',
                px: 2,
                py: 1,
                borderRadius: 2,
                boxShadow: 2,
                '&:hover': {
                  backgroundColor: '#dc2626',
                },
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default UserCard;
