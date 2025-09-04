import React from "react";
import { Box, Modal, Typography } from "@mui/material";

const LoginPage = ({ open, onClose }) => {

  const handleLogin = () => {
    // Redirect to Asgardeo OAuth2 authorization
    window.location.href = "http://localhost:8080/oauth2/authorization/asgardeo";
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          BOOK OCEAN
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 20,
            border: "1px solid #ccc",
            cursor: "pointer",
            transition: "0.3s",
            backgroundColor: "primary.main",
            color: "white",
            px: 2,
            py: 1,
            mt: 3,
            "&:hover": {
              boxShadow: 6,
              transform: "scale(1.05)",
            },
          }}
          onClick={handleLogin}
        >
          <Typography variant="h6" fontWeight="bold" sx={{ pr: 2 }}>
            Login Using Asgardeo
          </Typography>

          <Box
            component="img"
            src="/Asgardeo.jpg"
            alt="Asgardeo Logo"
            sx={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default LoginPage;
