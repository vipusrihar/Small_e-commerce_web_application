import React, { useState } from "react";
import {  AppBar,  Box,  Toolbar,  IconButton,  Typography,
  Menu,  Container,  Avatar,  Tooltip,  MenuItem,} from "@mui/material";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "../pages/LoginPage";

const settings = ["Profile", "Orders", "Logout"];

const NavBar = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.auth);

  const [loginModal, setLoginModal] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleLogin = () => setLoginModal(true);

const handleLogout = () => {
  window.location.href = "http://localhost:8080/logout";
};

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleMenuClick = (setting) => {
    handleCloseUserMenu();
    switch (setting) {
      case "Profile":
        navigate("/profile");
        break;
      case "Orders":
        navigate("/orders");
        break;
      case "Logout":
        handleLogout();
        break;
      default:
        break;
    }
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#A47864" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ width: "100%" }}>
            <Typography
              variant="h6"
              noWrap
              component="span"
              onClick={() => navigate("/")}
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              BOOKOCEAN
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
              {isLoggedIn ? (
                <>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt={user?.name || "User Avatar"}
                        src={user?.avatar || ""}
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    anchorEl={anchorElUser}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    keepMounted
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={() => handleMenuClick(setting)}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              ) : (
                <IconButton onClick={handleLogin}>
                  <NoAccountsIcon sx={{ height: 40, width: 40, color: "white" }} />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {loginModal && <LoginPage open={loginModal} onClose={() => setLoginModal(false)} />}
    </>
  );
};

export default NavBar;
