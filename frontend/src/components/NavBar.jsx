import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginPage from "../pages/LoginPage";
import { useSelector } from "react-redux";

const settings = ["Profile", "Orders", "Logout"];

const NavBar = () => {
  const navigate = useNavigate();
  const [loginModel, setLoginModel] = useState(false);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleLogin = () => {
    setLoginModel(true);
  };

  const handleLogout = async () => {
    await fetch("http://localhost:8080/logout", {
      method: "POST",
      credentials: "include"
    });
    window.location.href = "http://localhost:5173";
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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
        window.location.href = "http://localhost:8080/logout";
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
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              BOOKOCEAN
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>

              {isLoggedIn ? (
                <>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
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
      <LoginPage open={loginModel} />
    </>
  );
};

export default NavBar;
