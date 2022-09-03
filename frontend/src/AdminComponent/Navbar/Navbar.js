import * as React from "react";
import LoginIcon from "@mui/icons-material/Login";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userAction";
const Navbar = () => {
  const history = useHistory()
  const { isAuthenticated } = useSelector((state) => state.user);
  const user = useSelector((state) =>state.user);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      {isAuthenticated && user.user.role==="admin" && <Link to="/admin/dashboard" style={{textDecoration: "none",color:"black"}}><MenuItem onClick={handleMenuClose} >Dashboard</MenuItem></Link>}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {isAuthenticated ? (
        <>
          {" "}
          <MenuItem onClick={handleLogout}>
            <Link
              to="/"
              onClick={handleMenuClose}
              style={{
                textDecoration: "none",
                color: "black",
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconButton size="large" color="inherit">
                <LoginIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                Logout
              </Typography>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Profile
            </Typography>
          </MenuItem>
        </>
      ) : (
        <>
          <MenuItem>
            <Link
              to="/login"
              onClick={handleMenuClose}
              style={{
                textDecoration: "none",
                color: "black",
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconButton size="large" color="inherit">
                <LoginIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                Login
              </Typography>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to="/register"
              onClick={handleMenuClose}
              style={{
                textDecoration: "none",
                color: "black",
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconButton size="large" color="inherit">
                <HowToRegIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                Register
              </Typography>
            </Link>
          </MenuItem>
        </>
      )}
    </Menu>
  );

  return (
    <Box sx={{ zIndex: "5", position: "absolute", width: "100%" }}>
      <AppBar position="static" sx={{ backgroundColor: "black" }}>
        <Toolbar>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ color: "#fff" }}
            >
              HackMe
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {isAuthenticated ? (
              <>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                  onClick={handleLogout}
                >
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <Typography
                      variant="h6"
                      noWrap
                      component="div"
                      sx={{ color: "#fff" }}
                    >
                      Logout
                    </Typography>
                  </Link>
                </IconButton>
                <IconButton
                  size="x-large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                >
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    <Typography
                      variant="h6"
                      noWrap
                      component="div"
                      sx={{ color: "#fff" }}
                    >
                      Login
                    </Typography>
                  </Link>
                </IconButton>

                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                >
                  <Link to="/register" style={{ textDecoration: "none" }}>
                    <Typography
                      variant="h6"
                      noWrap
                      component="div"
                      sx={{ color: "#fff" }}
                    >
                      Register
                    </Typography>
                  </Link>
                </IconButton>
              </>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default Navbar;
