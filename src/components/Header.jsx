import React, { useState, useEffect } from "react";
import { primaryColor } from "../styled/login";
import * as ReactDOMServer from "react-dom/server";
import {
  Avatar,
  Menu,
  MenuItem,
  Typography,
  IconButton,
  AppBar,
  Box,
  Toolbar,
  Tooltip,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
export const settings = [{ id: 2, name: "Logout" }];
const drawerWidth = 240;

export const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open] = useState(false);
  const isLoggedIn = localStorage.getItem("citizenId") ? true : false;
  const notRegisterPage = window.location.pathname !== "/register";

  useEffect(() => {
    if (isLoggedIn) {
      const storedUser = localStorage.getItem("name");
      setUser({ fullName: storedUser });
    }
  }, [isLoggedIn]);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    handleMenuClose();
    window.location.href = "/login"; // redirect to login page
  };
  const handleCloseUserMenu = () => setAnchorEl(null);
  function MySVG() {
    return (
      <svg
        width="1920"
        height="94"
        viewBox="0 0 1920 94"
        fill={primaryColor}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1920 94V0L0 0V4.02857L601.74 4.02857C619.272 4.02857 636.166 10.6074 649.08 22.464L706.92 75.5646C719.834 87.4212 736.728 94 754.26 94L1920 94Z"
          fill={primaryColor}
        />
      </svg>
    );
  }

  const navBar = encodeURIComponent(
    ReactDOMServer.renderToStaticMarkup(<MySVG />)
  );
  const handleOpenUserMenu = (event) => setAnchorEl(event.currentTarget);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          open={open}
          className="appbar"
          style={{
            // minHeight: "70px",
            backgroundImage: `url("data:image/svg+xml,${navBar}"), linear-gradient(75deg, #fff, #fff)`,
            backgroundSize: "cover",
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              minHeight: "70px",
              px: 3, // padding left-right
            }}
          >
            {/* Left: Logo */}
            <Typography variant="h6" noWrap component="div">
              <img
                src={"https://doitc.rajasthan.gov.in/Content/images/logo.png"}
                alt="nav_logo"
                height="60px"
                style={{
                  objectFit: "cover",
                  cursor: "pointer",
                  marginTop: "5px",
                }}
                onClick={() => navigate("/home")}
              />
            </Typography>

            {/* Right: Avatar + Menu */}
            {isLoggedIn && notRegisterPage && user && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Tooltip title={user.fullName || ""}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={user.fullName?.[0]?.toUpperCase() || ""}
                      sx={{
                        bgcolor: "#1976d2",
                        color: "#fff",
                        fontWeight: "bold",
                      }}
                    >
                      {user.fullName?.[0]?.toUpperCase() || ""}
                    </Avatar>
                  </IconButton>
                </Tooltip>

                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleCloseUserMenu}
                >
                  {settings?.length > 0 &&
                    settings.map((setting) => (
                      <MenuItem
                        key={setting.id}
                        onClick={() => {
                          if (setting.id === 1) {
                            navigate("/userProfile", {
                              state: {
                                userId: sessionStorage.getItem("userId"),
                              },
                            });
                          } else if (setting.id === 2) {
                            handleLogout();
                          }
                          setAnchorEl(null);
                        }}
                      >
                        <Typography textAlign="center" variant="body2">
                          {setting?.name}
                        </Typography>
                      </MenuItem>
                    ))}
                </Menu>
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
